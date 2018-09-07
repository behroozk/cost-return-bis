import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostEditPage } from './cost-edit';

@NgModule({
  declarations: [
    CostEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CostEditPage),
  ],
})
export class CostEditPageModule {}
