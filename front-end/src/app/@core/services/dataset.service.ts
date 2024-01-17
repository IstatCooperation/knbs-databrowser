import { Injectable } from "@angular/core";
import { AppData } from "../model/app-data";

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor() { }

  public getSmartTableColums(data: any, meta: any) {
    let cols = data.Dimension(meta.column).id;
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
    let rows = jsonData.Dimension(meta.row).id;
    let cols = jsonData.Dimension(meta.column).id;
    let constraint = {};

    // initialize constraint
    meta.filter.forEach(filter => {
      constraint[filter.id] = filter.value;
    });
    //constraint[meta.filter.id] = meta.filter.value;

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
     * Crea l'oggetto 'meta' di default
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

}