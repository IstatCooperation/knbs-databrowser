import { Injectable } from "@angular/core";
import { AppData } from "../model/app-data";

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor() { }

  public getSmartTableColums(data: any, meta: any) {
    let cols = Object(data.Dimension(meta.column).id).sort();
    let result = {
      category: {
        title: 'Data',
        filter: false
      }
    };
    cols.forEach((col, index: number) => {
      result["key" + index] = {
        title: data.Dimension(meta.column).Category(col).label,
        filter: false
      };
    })
    return result;
  };

  public getSmartTableData(jsonData: any, meta: any) {
    let rows = Object(jsonData.Dimension(meta.row).id).sort();
    let cols = Object(jsonData.Dimension(meta.column).id).sort();
    let constraint = {};   

    // initialize constraint
    meta.filter.forEach(filter => {
      constraint[filter.id] = filter.value;
    });

    let outputTable = [];
    let outputRow = {};
    rows.forEach(row => {
      outputRow = {};
      outputRow["category"] = jsonData.Dimension(meta.row).Category(row).label;
      cols.forEach((col, index: number) => {
        constraint[meta.row] = row;
        constraint[meta.column] = col;
        outputRow["key" + index] = jsonData.Data(constraint, false);
      });
      outputTable.push(outputRow);
    });
    return outputTable;
  }

  /**
     * Crea l'oggetto 'meta' di default e setta dimensioni di default
     * @param dimensions 
     */
  public getDefaultDimList(dimensions: any) {
    let count = 0;
    let rowCode: any;
    let columnCode: any;
    for (var dimCode in dimensions) {
      switch (count) {
        case 0:
          rowCode = dimCode;
          dimensions[dimCode].type = AppData.ROW_DIM_TYPE;
          break;
        case 1:
          columnCode = dimCode;
          dimensions[dimCode].type = AppData.COLUMN_DIM_TYPE;
          break;
        default:
          dimensions[dimCode].type = AppData.FILTER_DIM_TYPE;
          break;
      }
      count++;
    }
    return dimensions;
  };

  private isDimensionHierarchical (dimension : any) : boolean {
    return !(dimension.category.child == null);
  }

}