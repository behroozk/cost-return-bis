import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekrecordsPage } from './weekrecords';

@NgModule({
  declarations: [
    WeekrecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekrecordsPage),
  ],
})
export class WeekrecordsPageModule {}
