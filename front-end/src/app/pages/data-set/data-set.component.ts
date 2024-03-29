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
import { exportDataToCsv } from '../../@core/exports/export';


@Component({
  selector: 'ngx-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
})
export class DataSetComponent {
  url: any;

  urlCSVDataset: any;

  datasetLoaded: boolean = false;

  data: any;

  jsonData: any;

  settings: any;

  filters: FilterDimension[] = [];

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


  /**
   * Load dataset based on ID 
   * @param id 
   */
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


  /**
   * Set default table data based on metadata
   * @param meta 
   */
  private setDefaultTableData(meta: any) {
    this.setDataAndFilters(meta, true);
  }

  /**
   * Set table data based on metadata
   * @param meta 
   */
  private setTableData(meta: any) {
    this.setDataAndFilters(meta, false);
  }

  /**
   * Set data and filters for the table
   * @param meta 
   * @param setDefaultfilter (true = set defualt filter)
   */
  private setDataAndFilters(meta: any, setDefaultfilter: boolean) {
    this.datasetLoaded = false;

    this.data = this.datasetService.getSmartTableData(this.jsonData, meta);

    this.settings = {
      pager: { perPage: 20 },
      columns: this.datasetService.getSmartTableColums(this.jsonData, meta, this.data),
      actions: {
        edit: false,
        delete: false,
        add: false,
        position: 'right'
      }
    };

    if (setDefaultfilter === true)
      this.filters = this.getFilterObjList(this.datasetFacade.getDimensions());
    this.datasetLoaded = true;
  }

  /**
   * Close the dialog
   */
  closeDialog() {
    this.router.navigateByUrl('/pages/themes');
  }

  /**
   * Handle click on settings button
   */
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

  /**
   * Generate filter object list from dimensions
   * @param dimList 
   * @returns 
   */
  private getFilterObjList(dimList: any): FilterDimension[] {
    let filterDimList: FilterDimension[] = [];
    for (var dimCode in dimList) {
      if (dimList[dimCode].type === AppData.FILTER_DIM_TYPE) {
        filterDimList.push(this.getFilterObjFromDimension(dimCode, dimList[dimCode]));
      }
    }
    return filterDimList;
  }


  /**
   * Generate filter object from dimension
   * @param dimCode 
   * @param dimension 
   * @returns 
   */
  private getFilterObjFromDimension(dimCode: any, dimension: any): FilterDimension {

    let child = dimension.category.child;

    let options: Option[] = [];

    if (child) { 
      Object.keys(child).sort().forEach(element0 => {
        options.push(new Option(element0, dimension.category.label[element0]));
        child[element0].forEach(element1 => {
          options.push(new Option(element1, " - " + dimension.category.label[element1]));
        });
      });      
    }
    else {
      Object.keys(dimension.category.index).sort().forEach(key => {
        options.push(new Option(key, dimension.category.label[key]));
      })
    }

    return new FilterDimension(dimCode, dimension.label, options[0].value, options);
  }

  /**
   * Handle change in filter value
   * @param value 
   * @param filterId 
   */
  onChangeFilter(value: any, filterId: any) {
    this.datasetFacade.setFilterValue(filterId, value);
    this.setTableData(this.datasetFacade.getMeta());
    this.filters.find(element => element.id == filterId).value = value;
  }

  /**
   * Export dataset to CSV
   */
  exportToCsv() {
    exportDataToCsv(this.data, 
      this.settings,
      this.datasetFacade.getDataSet().desc,
      this.getFilterDescFromMeta(this.datasetFacade.getMeta()));
  }

  private getFilterDescFromMeta (meta : any) {
    let dimension : any;
    let filtersDesc = [];
    meta.filter.forEach(theFilter => {
      dimension = this.datasetFacade.getDimensions()[theFilter.id];
      filtersDesc.push({label : dimension.label, value : dimension.category.label[theFilter.value]});
    });
    return filtersDesc;
  }
}

