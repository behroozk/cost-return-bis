import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCostPage } from './tab-cost';

@NgModule({
  declarations: [
    TabCostPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCostPage),
  ],
})
export class TabCostPageModule {}
