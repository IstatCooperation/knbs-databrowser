import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestResponse } from "../model/rest-response";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class JSONStatService {  


    constructor(private http: HttpClient) { }
        
    public getJSONstatFromUrl(url: string): Observable <any> {
        return this.http.get(url);
    } 
    
    public getDatasetList(lang : any): Observable<RestResponse> {
        return this.http.get<RestResponse>(environment.THEMES_LIST_URL + "?lang=" + lang);
    }

    public getThemesList(lang : any): Observable<RestResponse> {
        return this.http.get<RestResponse>(environment.THEMES_LIST_URL + "?lang=" + lang);
    }    

    catchError(error){
        console.log(error);
    }
}