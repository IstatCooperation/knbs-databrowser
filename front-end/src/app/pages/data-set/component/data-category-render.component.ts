import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'data-category',  
  styleUrls: ['data-category-render.component.scss'],  
  template: `
    <span>{{indent}}{{renderValue}}</span>
  `,
})
export class DataCategoryRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  indent = "";

  ngOnInit() {
    this.renderValue = this.value.toString();
    if (this.rowData.lvl > 0)
      this.indent = " " + "-".repeat(this.rowData.lvl) + " ";
  }

}
