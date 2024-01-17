import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { AppData } from "../@core/model/app-data";


@Injectable({
    providedIn: 'root',
})
export class PagesFacade {
    private selectedTabTitle: any;    

    constructor(private toastrService: NbToastrService) { }

    public toastError(message: string) {
        this.toastrService.show(message, "Errore",
            {
                destroyByClick: true,
                status: "danger",
                preventDuplicates: true
            });
    }

    public toastSuccess(message: string) {
        this.toastrService.show(message, "OK",
            {
                destroyByClick: true,
                status: "success",
                duration: 4000,
                preventDuplicates: true
            });
    }    

    public setSelectedThemeTitle(tabTitle: any) {
        this.selectedTabTitle = tabTitle;
    }

    public getSelectedThemeTitle(): number {
        return this.selectedTabTitle;
    }    
}