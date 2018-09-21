import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../home/home';

import { DatabaseServicesProvider } from '../../providers/database-services/database-services';
/**
 * Generated class for the ChooseVegetablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-vegetable',
  templateUrl: 'choose-vegetable.html',
})
export class ChooseVegetablePage {
  _cabbage='cabbage';
  _carrots='carrots';

  client_name = '';
  client_age = '';
  client_location = '';
  // vegetable:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private dbServiceProvier: DatabaseServicesProvider, public loadingCtrl: LoadingController,
      public alertCtrl: AlertController, public menuCtrl: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseVegetablePage');
  }
  ionViewWillEnter(){
    let intro = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Please wait..
        </div>
      </div>`,
        });

        intro.present();
        setTimeout(() => {
            intro.dismiss();
      }, 500);
  }
  calculateCarrots(){
    sessionStorage.setItem("vegetable", this._carrots);
    this.dbServiceProvier.createCarrotsDatabase();
      // this.sqlite.create({
      // name: 'ionicdb.db',
      // location: 'default'
      //   }).then((db: SQLiteObject) => {
      // db.executeSql('CREATE TABLE IF NOT EXISTS client_details(rowid INTEGER PRIMARY KEY, client_name TEXT, client_age TEXT, client_location TEXT, date_recorded TEXT)',{})
      // .then(res => console.log('Executed client details'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS carrots_expenses(`rowid` int auto_increment primary key, `input` VARCHAR(8000), `labor` VARCHAR(8000), `admin` VARCHAR(8000))', {})
      // .then(res => console.log('Executed SQL input carrot expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS inputs_carrots_expenses(`rowid` int auto_increment primary key, `input_name` TEXT, `input_cost` INT)', {})
      // .then(res => console.log('Executed SQL input carrot expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS inputs_carrots_expenses(`rowid` int auto_increment primary key, `input_name` TEXT, `input_cost` INT)', {})
      // .then(res => console.log('Executed SQL labor carrot expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS admin_carrots_expenses(`rowid` int auto_increment primary key, `labor_name` TEXT, `mandays` INT, `manpower` INT, `mancost` INT)', {})
      // .then(res => console.log('Executed SQL admin carrot expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS carrots_expenses(`rowid` int auto_increment primary key, `input_cost` INT, `labor_mandays` INT, `labor_mancost` INT, `labor_manpower` INT, `admin_cost` INT)', {})
      // .then(res => console.log('Executed SQL carrots_expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS carrots_expenses(rowid INTEGER NOT NULL, seedlings TEXT, fertilizer TEXT, pesticide TEXT, clearing TEXT, bed_operations TEXT, planting TEXT, hilling_up TEXT, spraying TEXT, harvest TEXT, administrative_Cost TEXT, land_rental TEXT, packingMT TEXT, overhead_contigency TEXT, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      // .then(res => console.log('Executed SQL carrots_expenses'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS carrots_calculated_values(rowid INTEGER NOT NULL, subTotal_inputs DECIMAL, subTotal_Labor DECIMAL, subTotal_admin DECIMAL, gain_total DECIMAL, cost_total DECIMAL, roi_result DECIMAL, money_return DECIMAL, expected_Kilo DECIMAL, expected_Price DECIMAL, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      // .then(res => console.log('Executed SQL carrots_calculated_values'))
      // .catch(e => console.log(e.message));
      // db.executeSql('CREATE TABLE IF NOT EXISTS laborDetails(rowid INT NOT NULL, clearingMD INT, clearingNP INT, bed_operationsMD INT, bed_operationsNP INT, plantingMD INT, plantingNP INT, hilling_upMD INT, hilling_upNP INT, sprayingMD INT, sprayingNP INT, harvestMD INT, harvestNP INT , clearing_t INT , bed_operations_t INT, planting_t INT, hilling_up_t INT, spraying_t INT, harvest_t INT, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      // .then(res => console.log('Executed SQL laborDetails'))
      // .catch(e => console.log(e.message));
    // })
    //   .catch(e => console.log(e.message));
    let loading = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Please wait..
        </div>
      </div>`,
        });

        loading.present();
        setTimeout(() => {
            sessionStorage.setItem('cname',this.client_name);
            sessionStorage.setItem('cage',this.client_age);
            sessionStorage.setItem('clocation',this.client_location);
            loading.dismiss();
            this.navCtrl.push(HomePage);
      }, 2500);
      }
  calculateCabbage(){
      sessionStorage.setItem("vegetable", this._cabbage);
      // this.saveClientInformation();
      this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
        }).then((db: SQLiteObject) => {
      // db.executeSql('CREATE TABLE IF NOT EXISTS client_details(rowid INTEGER PRIMARY KEY, client_name TEXT, client_age TEXT, client_location TEXT)',{})
      // .then(res => console.log('Executed client details'))
      // .catch(e => console.log(e.message));
      db.executeSql('CREATE TABLE IF NOT EXISTS cabbage_expenses(rowid INTEGER NOT NULL, seedlings TEXT, fertilizer TEXT, lime TEXT, pesticide TEXT, tilage TEXT, digging TEXT, planting TEXT, spraying TEXT, hilling_up TEXT, irrigation TEXT, harvest TEXT, administrative_Cost TEXT, land_rental TEXT, packingMaterials TEXT, transportation TEXT, overhead_contigency TEXT, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      .then(res => console.log('Executed SQL cabbage_expenses'))
      .catch(e => console.log(e.message));
      db.executeSql('CREATE TABLE IF NOT EXISTS cabbage_calculated_values(rowid INTEGER NOT NULL, subTotal_inputs DECIMAL, subTotal_Labor DECIMAL, subTotal_admin DECIMAL, gain_total DECIMAL, cost_total DECIMAL, roi_result DECIMAL, money_return DECIMAL, expected_Kilo DECIMAL, expected_Price DECIMAL, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      .then(res => console.log('Executed SQL cabbage_calculated_values'))
      .catch(e => console.log(e.message));
      db.executeSql('CREATE TABLE IF NOT EXISTS cabbage_laborDetails(rowid INT NOT NULL, tilageMD INT, tilageNP INT, diggingMD INT, diggingNP INT, plantingMD INT, plantingNP INT, sprayingMD INT, sprayingNP INT, hilling_upMD INT, hilling_upNP INT, irrigationMD INT, irrigationNP INT, harvestMD INT, harvestNP INT , tilage_t INT , digging_t INT, planting_t INT, spraying_t INT, hilling_up_t INT, irrigation_t INT, harvest_t INT, Foreign Key (rowid) REFERENCES client_details(rowid))', {})
      .then(res => console.log('Executed SQL cabbage laborDetails'))
      .catch(e => console.log(e.message));
    })
      .catch(e => console.log(e.message));
      let loading_1 = this.loadingCtrl.create({
            content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">
            Please wait..
          </div>
        </div>`,
          });

          loading_1.present();
          setTimeout(() => {
              loading_1.dismiss();

              this.navCtrl.push(HomePage);
        }, 2500);
  }
  openMenu() {
   this.menuCtrl.open();
 }
}
