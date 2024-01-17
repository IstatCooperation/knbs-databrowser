import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  titolo : any;

  private alive = true;

  constructor(public translate: TranslateService) {
      this.titolo = translate.instant('home.title');
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
