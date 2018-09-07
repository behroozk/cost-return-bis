import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewInputsPage } from './review-inputs';

@NgModule({
  declarations: [
    ReviewInputsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewInputsPage),
  ],
})
export class ReviewInputsPageModule {}
