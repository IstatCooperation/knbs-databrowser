import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'data-category',  
  styleUrls: ['./data-render.component.scss'],  
  templateUrl: './data-render.component.html',
})
export class DataRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  class = "";

  ngOnInit() {
    this.renderValue = Number(this.value).toLocaleString("en-US");
    this.class = (this.rowData.lvl == 0 || this.rowData.tot ? "td-number-bold" : "td-number");
  }

}
