/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: `
    <router-outlet *ngIf="dataLoaded"></router-outlet>
    `,
})
export class AppComponent implements OnInit {

  dataLoaded: boolean = false;

  constructor(translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');    
  }

  ngOnInit(): void {
    this.dataLoaded = true;
  }
}
