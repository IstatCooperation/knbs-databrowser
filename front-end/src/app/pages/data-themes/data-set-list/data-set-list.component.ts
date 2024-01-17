import { Component, Input } from '@angular/core';
import { DatasetFacade } from '../../dataset-facade';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'ngx-data-set-list',
  templateUrl: './data-set-list.component.html',
  styleUrls: ['./data-set-list.component.scss'],
})
export class DataSetListComponent {

  @Input() theme: any;  
  
  dataLoaded: boolean = false;
  dataSetList: any;

  constructor(private facade : DatasetFacade) {}

  ngOnInit() {    
    this.dataSetList = this.theme.datasets;
    this.dataLoaded = true;
  }

  getUrlDownloadCSV(id : any){
    return environment.DATASET_URL + "?id=" + id + "&type=csv";;
  }
}

