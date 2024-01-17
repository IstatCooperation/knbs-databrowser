import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppData {
    static LANG = 'en';

    public static ROW_DIM_TYPE : number = 0;    
    public static COLUMN_DIM_TYPE : number = 1;
    public static FILTER_DIM_TYPE : number = 2;
}