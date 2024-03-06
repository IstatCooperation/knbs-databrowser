import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { AppData } from "../@core/model/app-data";


@Injectable({
    providedIn: 'root',
})
export class DatasetFacade {

    private dimensions: any;

    private meta: any;

    private dataset: any;

    constructor(private toastrService: NbToastrService) { }

    setFilterValue(filterId: any, value: any) {
        this.meta.filter.find(element => element.id == filterId).value = value;
    }

    setDimensionType(dimCode: any, dimType: any) {
        this.dimensions[dimCode].type = dimType;
    }

    public setDimensionsAndMeta(dimList: any) {
        this.dimensions = dimList;
        this.meta = this.getMetaFromDimensionList(dimList);
    }

    public getDimensions(): any {
        return this.dimensions
    }

    public setMeta(meta: any) {
        this.meta = meta;
    }

    public getMeta(): any {
        return this.meta;
    }

    public setDataSet(theDataset: any) {
        this.dataset = theDataset;
    }

    public getDataSet(): any {
        return this.dataset;
    }

    public getDataSetID(): any {
        return this.dataset.id;
    }

    /**
        * Set meta object from dimension list
        * @param dimensions list of dimension
        */
    private getMetaFromDimensionList(dimensions: any) {
        let rowCode: any;
        let columnCode: any;
        let filters: {}[] = [];
        let theValue: any;

        for (var dimCode in dimensions) {
            switch (dimensions[dimCode].type) {
                case AppData.ROW_DIM_TYPE:
                    rowCode = dimCode;
                    break;
                case AppData.COLUMN_DIM_TYPE:
                    columnCode = dimCode;
                    break;
                case AppData.FILTER_DIM_TYPE:
                    if (dimensions[dimCode].category.child)
                        theValue = Object.keys(dimensions[dimCode].category.child).sort()[0];
                    else
                        theValue = Object.keys(dimensions[dimCode].category.index)[0];
                    filters.push({ id: dimCode, value: "" + theValue });
                    break;
            }
        }

        let meta = {
            row: rowCode,
            column: columnCode,
            filter: filters
        }

        return meta;
    };

    public refreshMeta() {
        this.meta = this.getMetaFromDimensionList(this.dimensions);
    }
}