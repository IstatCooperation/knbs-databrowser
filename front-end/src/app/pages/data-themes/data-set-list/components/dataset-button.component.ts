import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetFacade } from '../../../dataset-facade';


@Component({
  selector: "dataset-button",
  template: `<button  nbButton fullwidth outline  (click)='openDatasetComponent()' 
    size='small' [disabled]="disabled" status='{{status}}' 
    nbTooltip='{{ tooltipText }}' class="mb-2 mr-2">
    <nb-icon icon="arrow-forward-outline"></nb-icon></button>`
})

export class DataSetButton implements OnInit {

  @Input() dataset: any;

  newModal: boolean = false;
  tooltipText: string;
  icon: string;
  status: string;
  disabled: boolean = false;

  constructor(private router : Router,
    private facade : DatasetFacade) {
  }

  ngOnInit() {
    this.tooltipText = "Open " + this.dataset.name + " table";
    this.icon = "cube-outline";
    this.status = "warning";
  }

  openDatasetComponent() {
    this.facade.setDataSet(this.dataset);
    this.router.navigateByUrl('/pages/dataset');
  }
}