import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DataThemesModule } from './data-themes/data-themes.module';
import { DataSetModule } from './data-set/data-set.module';
import { DataTableSettingsModule } from './datatable-settings/datatable-settings.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DataThemesModule,
    MiscellaneousModule,
    DataSetModule,
    DataTableSettingsModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
