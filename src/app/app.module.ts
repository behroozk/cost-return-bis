import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ArrayStorage } from '../providers/data/data';
import { DataProvider } from '../providers/data/data';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChooseVegetablePage } from '../pages/choose-vegetable/choose-vegetable';
import { CarrotsInputsLaborCostsPage } from '../pages/carrots-inputs-labor-costs/carrots-inputs-labor-costs';
import { ReviewInputsPage } from '../pages/review-inputs/review-inputs';
import { MenudatabasePage } from '../pages/menudatabase/menudatabase';
import { ShowDataPage } from '../pages/show-data/show-data';
import { PopoverPage } from '../pages/popover/popover';
import { SummaryInputsPage } from '../pages/summary-inputs/summary-inputs';
import { CostEditPage } from '../pages/cost-edit/cost-edit';
import { CostEditViewPage } from '../pages/cost-edit-view/cost-edit-view';
import { LoginPage } from '../pages/login/login';
import { ClientInfoPage } from '../pages/client-info/client-info';

//Modules
import { ChooseVegetablePageModule } from '../pages/choose-vegetable/choose-vegetable.module';
import { CarrotsInputsLaborCostsPageModule } from '../pages/carrots-inputs-labor-costs/carrots-inputs-labor-costs.module';
import { ReviewInputsPageModule } from '../pages/review-inputs/review-inputs.module';
import { MenudatabasePageModule } from '../pages/menudatabase/menudatabase.module';
import { ShowDataPageModule } from '../pages/show-data/show-data.module';
import { PopoverPageModule } from '../pages/popover/popover.module';
import { SummaryInputsPageModule } from '../pages/summary-inputs/summary-inputs.module';
import { CostEditPageModule } from '../pages/cost-edit/cost-edit.module';
import { CostEditViewPageModule } from '../pages/cost-edit-view/cost-edit-view.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ClientInfoPageModule } from '../pages/client-info/client-info.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // ChooseVegetablePage,
    // CarrotsInputsLaborCostsPage,
    // ReviewInputsPage,
    // MenudatabasePage,
    // ShowDataPage,
    // SummaryInputsPage,
    // PopoverPage,
    // CostEditPage,
    // CostEditViewPage,
    // LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,IonicModule.forRoot(MyApp)),
    ChooseVegetablePageModule,
    CarrotsInputsLaborCostsPageModule,
    ReviewInputsPageModule,
    MenudatabasePageModule,
    ShowDataPageModule,
    PopoverPageModule,
    SummaryInputsPageModule,
    CostEditPageModule,
    CostEditViewPageModule,
    LoginPageModule,
    ClientInfoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChooseVegetablePage,
    CarrotsInputsLaborCostsPage,
    ReviewInputsPage,
    MenudatabasePage,
    ShowDataPage,
    SummaryInputsPage,
    PopoverPage,
    CostEditPage,
    CostEditViewPage,
    LoginPage,
    ClientInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArrayStorage,
    DataProvider,
    SQLite,
    Toast
  ]
})
export class AppModule {}
