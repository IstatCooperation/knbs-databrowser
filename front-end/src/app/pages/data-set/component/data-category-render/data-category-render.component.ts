import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'data-category',  
  styleUrls: ['./data-category-render.component.scss'],  
  templateUrl: './data-category-render.component.html',
})
export class DataCategoryRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  indent = "";

  class = "";

  ngOnInit() {
    this.renderValue = this.value.toString();
    this.class = (this.rowData.lvl == 0 || this.rowData.tot ? "font-weight-bold" : "");
    if (this.rowData.lvl > 0)
      this.indent = " " + "-".repeat(this.rowData.lvl) + " ";

  }

}
