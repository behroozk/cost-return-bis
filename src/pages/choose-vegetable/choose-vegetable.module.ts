import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseVegetablePage } from './choose-vegetable';

@NgModule({
  declarations: [
    ChooseVegetablePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseVegetablePage),
  ],
})
export class ChooseVegetablePageModule {}
