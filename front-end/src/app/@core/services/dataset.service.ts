import { Injectable } from "@angular/core";
import { AppData } from "../model/app-data";
import { DataCategoryRenderComponent } from "../../pages/data-set/component/data-category-render/data-category-render.component";
import { DataRenderComponent } from "../../pages/data-set/component/data-render/data-render.component";

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor() { }

  public getSmartTableColums(jsonData: any, meta: any, tableData: any) {
    let cols = Object(jsonData.Dimension(meta.column).id);
    let result = {
      category: {
        title: '',
        type: 'custom',
        filter: false,  
        sort: false,   
        renderComponent: DataCategoryRenderComponent
      }
    };
    cols.forEach((col : any, index: number) => {
      result["key" + index] = {
        title: jsonData.Dimension(meta.column).Category(col).label,
        type: 'custom',
        filter: false,
        sort: false,
        class : "th-number-bold",
        renderComponent: DataRenderComponent
      };
    })
    return result;
  };

  public getSmartTableData(jsonData: any, meta: any) {
    let outputTable = [];
    let outputRow = {};
    let constraint = {};
    let rows: any;

    let cols = Object(jsonData.Dimension(meta.column).id);

    let child = Object(jsonData.Dimension(meta.row)).__tree__.category.child;

    // initialize constraint
    meta.filter.forEach(filter => {
      constraint[filter.id] = filter.value;
    });

    if (child) {
      rows = [];
      Object.keys(child).sort().forEach(element0 => {
        rows.push([element0, 0]);
        child[element0].forEach(element1 => {
          rows.push([element1, 1]);          
        });
      });
    }
    else {
      rows = Object(jsonData.Dimension(meta.row).id);
    }

    let row : any;
    let level : any;
    let total : boolean;

    rows.forEach(theRow => {
      if (Array.isArray(theRow)) {
        row = theRow[0];
        level = theRow[1];
        total = false;
      }
      else {
        row = theRow;        
        level = (child ? 0 : null) // level is null if the dimension is not hierachical
        total = (theRow == "T");
      }

      outputRow = {};
      outputRow["category"] = jsonData.Dimension(meta.row).Category(row).label;
      cols.forEach((col, index: number) => {
        constraint[meta.row] = row;
        constraint[meta.column] = col;
        outputRow["key" + index] = jsonData.Data(constraint, false);
        outputRow["lvl"] = level;
        outputRow["tot"] = total;
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
  }

}