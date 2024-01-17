import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DatasetFacade } from '../dataset-facade';
import { AppData } from '../../@core/model/app-data';

@Component({
    selector: 'datatable-settings',
    templateUrl: './datatable-settings.component.html',
    styleUrls: ['./datatable-settings.component.scss']
})
export class DataTableSettingsComponent implements OnInit {

    private meta: any;

    dimensionList = [];

    saveButtonDisabled = false;

    tooltipText = "Save"

    options = [
        { value: AppData.COLUMN_DIM_TYPE, label: "Column" },
        { value: AppData.ROW_DIM_TYPE, label: "Row" },
        { value: AppData.FILTER_DIM_TYPE, label: "Filter" }
    ]

    constructor(protected ref: NbDialogRef<DataTableSettingsComponent>,
        private facade: DatasetFacade) { }

    ngOnInit() {
        this.dimensionList = this.getDimensionsList(this.facade.getDimensions());
        this.meta = this.facade.getMeta();
        this.setSaveButton();
    }

    private setSaveButton() {
        let countRow = 0;
        let countCol = 0;
        let countFiter = 0;
        this.dimensionList.forEach(dim => {
            switch (dim.type) {
                case AppData.ROW_DIM_TYPE:
                    countRow++;
                    break;
                case AppData.COLUMN_DIM_TYPE:
                    countCol++;
                    break;
                case AppData.FILTER_DIM_TYPE:
                    countFiter++;
                    break;
            }            
        });
        if (countRow > 1 || countCol > 1 ) {
            this.tooltipText = "Is allowed to choose one dimension in the row and one in the column";
            this.saveButtonDisabled = true;
        }
        else if (countRow == 0 || countCol == 0 ) {
            this.tooltipText = "Is required  to choose a columns dimension and one rows dimension";
            this.saveButtonDisabled = true;
        }        
        else {
            this.tooltipText = "Save";            
            this.saveButtonDisabled = false;            
        }
    }

    closeDialog() {
        this.ref.close(false);
    }

    save() {
        this.dimensionList.forEach(dim => {
            this.facade.setDimensionType(dim.id, dim.type);
        });
        this.facade.refreshMeta();
        this.ref.close(true);        
    }

    onChange(newType: any, dimCode: any) {
        this.dimensionList.find(element => {
            if(element.id === dimCode) { element.type = newType}
        });
        this.setSaveButton();
    }

    private getDimensionsList(dimList: any): any {
        let dimensionList = [];
        for (var dimCode in dimList) {
            dimensionList.push({
                id: dimCode,
                label: dimList[dimCode].label,
                type: dimList[dimCode].type
            });
        }
        return dimensionList;
    }
}