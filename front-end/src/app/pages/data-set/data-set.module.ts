import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DataSetComponent } from './data-set.component';

@NgModule({  
  imports: [
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbTreeGridModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DataSetComponent
  ],
})
export class DataSetModule { }
