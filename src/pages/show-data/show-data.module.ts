import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowDataPage } from './show-data';

@NgModule({
  declarations: [
    ShowDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowDataPage),
  ],
})
export class ShowDataPageModule {}
