import { Component } from '@angular/core';
import { JSONstat } from '../../../assets/js/unpkg_com_jsonstat-toolkit@1_4_2_iife.js';
import { DatasetFacade } from '../dataset-facade';
import { Router } from '@angular/router';
import { DatasetService } from '../../@core/services/dataset.service';
import { NbDialogService } from '@nebular/theme';
import { DataTableSettingsComponent } from '../datatable-settings/datatable-settings.component';
import { PagesFacade } from '../pages-facade';
import { AppData } from '../../@core/model/app-data';
import { environment } from '../../../environments/environment';
import { FilterDimension } from '../../@core/model/filter-Dimension';
import { Option } from '../../@core/model/option';
import { exportToCsv } from '../../@core/exports/export';


@Component({
  selector: 'ngx-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
})
export class DataSetComponent {
  url : any;

  urlCSVDataset : any;

  datasetLoaded: boolean = false;

  data: any;

  jsonData: any;

  settings: any;

  filters : FilterDimension [] = [];

  constructor(private datasetService: DatasetService,
    private datasetFacade: DatasetFacade,
    private pagesfacade: PagesFacade,
    private router: Router,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    if (this.datasetFacade.getDataSet()) {
      this.loadDataset(this.datasetFacade.getDataSetID());
    }
    else
      this.pagesfacade.toastError("No dataset selected");
  }



  async loadDataset(id: any) {
    this.datasetLoaded = false;
    this.url = environment.DATASET_URL + "?id=" + id;
    this.urlCSVDataset = this.url + "&type=csv";
    
    this.jsonData = await JSONstat(this.url);

    let dimensions = this.datasetService.getDefaultDimList(this.jsonData.__tree__.dimension);

    this.datasetFacade.setDimensionsAndMeta(dimensions);

    let meta = this.datasetFacade.getMeta();
    if (meta) {
      this.setDefaultTableData(meta);
    }
    else {
      this.pagesfacade.toastError("Error loading dataset");
    }

    this.datasetLoaded = true;
  } 

  private setDefaultTableData(meta : any) {
    this.setDataAndFilters(meta, true);
  }

  private setTableData(meta : any) {
    this.setDataAndFilters(meta, false);
  }  

  /**
   * 
   * @param meta 
   * @param setDefaultfilter true to get default filters data
   */
  private setDataAndFilters(meta: any, setDefaultfilter : boolean) {
    this.datasetLoaded = false;

    this.settings = {
      pager: { perPage: 20 },
      columns: this.datasetService.getSmartTableColums(this.jsonData, meta),
      actions: {
        edit: false,
        delete: false,
        add: false,
        position: 'right'
      }
    };

    this.data = this.datasetService.getSmartTableData(this.jsonData, meta);

    if (setDefaultfilter === true)
      this.filters = this.getFilterObjList(this.datasetFacade.getDimensions());
    this.datasetLoaded = true;
  }

  closeDialog() {
    this.router.navigateByUrl('/pages/themes');
  }

  onClickButtonSettings() {
    this.dialogService
      .open(DataTableSettingsComponent, {
        context: {},
        closeOnEsc: false,
        closeOnBackdropClick: false
      })
      .onClose.subscribe(reload => {
        if (reload == true)
          this.setDefaultTableData(this.datasetFacade.getMeta());
      });
  }

  
  private getFilterObjList(dimList: any) : FilterDimension [] {  
    let filterDimList : FilterDimension [] = [];
    for (var dimCode in dimList) {
      if (dimList[dimCode].type === AppData.FILTER_DIM_TYPE) {        
        filterDimList.push(this.getFilterObjFromDimension(dimCode, dimList[dimCode]));
      }
    }  
    return filterDimList;
  }  


  private getFilterObjFromDimension(dimCode: any, dimension: any) : FilterDimension {
    let sortedKeys = Object.keys(dimension.category.index).sort();
    let options : Option [] = [];

    sortedKeys.forEach(key => {
      options.push(new Option(key, dimension.category.label[key]));     
    })

    /*for (var i in dimension.category.index) {      
      options.push(new Option(i, dimension.category.label[i]));     
    }*/
    
    return new FilterDimension (dimCode, dimension.label, options[0].value, options);
  }  

  onChangeFilter(value: any, filterId: any) {
    this.datasetFacade.setFilterValue(filterId, value);
    this.setTableData(this.datasetFacade.getMeta());
    this.filters.find(element => element.id == filterId).value = value;
  }

  exportToCsv() {
    exportToCsv(this.data, this.settings)
  }
}
