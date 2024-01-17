import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DataThemesComponent } from './data-themes.component';
import { DataSetListComponent } from './data-set-list/data-set-list.component';
import { DataSetButton } from './data-set-list/components/dataset-button.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbButtonModule,
    NbTooltipModule,
    NbIconModule
  ],
  declarations: [
    DataThemesComponent,
    DataSetListComponent,
    DataSetButton
  ],
})
export class DataThemesModule { }
