import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostEditViewPage } from './cost-edit-view';

@NgModule({
  declarations: [
    CostEditViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CostEditViewPage),
  ],
})
export class CostEditViewPageModule {}
