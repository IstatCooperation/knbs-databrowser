import { Component } from '@angular/core';
import { JSONStatService } from '../../@core/services/JSONstatService';
import { AppData } from '../../@core/model/app-data';
import { PagesFacade } from '../pages-facade';

@Component({
  selector: 'ngx-data-themes',
  templateUrl: './data-themes.component.html',
  styleUrls: ['./data-themes.component.scss'],
})
export class DataThemesComponent {
  dataLoaded : boolean = false;;
  themesList : any;
  selectedTabTitle : any;

  constructor(private jsonStatService: JSONStatService, 
    private facade: PagesFacade) { }

  ngOnInit() {
    this.selectedTabTitle = this.facade.getSelectedThemeTitle();
    this.jsonStatService.getThemesList(AppData.LANG).subscribe(
      data => {
        this.themesList = data;
        this.dataLoaded = true;    
      },
      error => {
        console.log(error);
        this.facade.toastError("Theme data loading error");
      })
  }

  public isSelectedTheme(id : any) : boolean {
    return this.facade.getSelectedThemeTitle() === id;
  }

  changeTab(tab : any) {
    this.facade.setSelectedThemeTitle(tab.tabTitle);
  }
}

