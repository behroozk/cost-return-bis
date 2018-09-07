import { Component } from '@angular/core';
import { IonicPage, App, NavParams, AlertController, ToastController, LoadingController, ViewController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SummaryInputsPage } from '../summary-inputs/summary-inputs';
import { ArrayStorage } from '../../providers/data/data';
/**
 * Generated class for the ReviewInputsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-inputs',
  templateUrl: 'review-inputs.html',
})
export class ReviewInputsPage {
  // _inputsCost='';
  // _adminCost='';
  // _totalCost='';
  // _numManPower='';
  // _numDays='';
  // _costPerDay='';
  // _laborTotalCost='';
  _client_id:any;
  _majorCosts: { id: number, costName: string }[];
  _subLaborCosts=0;
  // lastID = { rowid: 0};
  vegetable = '';
  constructor(public app: App, public navParams: NavParams, public _arrays: ArrayStorage,
    private alertCtrl: AlertController ,private sqlite: SQLite, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
      this._subLaborCosts = this.navParams.get('userId');
      console.log(this._subLaborCosts);
  }
  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Please wait...',
    duration: 2000
    });
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }
  ionViewWillLoad() {
    console.log('ionViewDidLoad ReviewInputsPage');
    this.showLegends();
    this.vegetable = sessionStorage.getItem('vegetable');
    // this._inputsCost = this._arrays._storeArray1;
    // this._totalCost = this._arrays._storeArray4; // total cost inputs,fertilizer
    // this._adminCost = this._arrays._storeArray6;

    // this._numManPower = this._arrays._storeArray2;
    // this._numDays = this._arrays._storeArray3;
    // this._laborTotalCost = this._arrays._storeArray5; // total cost per labor
    // this._costPerDay = this._arrays._storeArray7; // labor cost/day
    if(this.vegetable == 'carrots'){
    console.log("Results : " +this._arrays._storeArray1[0]+ "," +this._arrays._storeArray1[1]+ "," +this._arrays._storeArray1[2]+ "," +this._arrays._storeArray5[0]+","+this._arrays._storeArray5[1]+","+this._arrays._storeArray5[2]+","+this._arrays._storeArray5[3]+","+this._arrays._storeArray5[4]
    +","+this._arrays._storeArray5[5]+","+this._arrays._storeArray6[0]+","+this._arrays._storeArray6[1]+","+this._arrays._storeArray6[2]+","+this._arrays._storeArray6[3]);
    this._majorCosts = [
    { "id": 0, "costName": this._arrays._storeArray1[0] },
    { "id": 1, "costName": this._arrays._storeArray1[1] },
    { "id": 2, "costName": this._arrays._storeArray1[2] },
    // { "id": 3, "costName": this._arrays._storeArray5[0] },// total per labor cost
    // { "id": 4, "costName": this._arrays._storeArray5[1] },
    // { "id": 5, "costName": this._arrays._storeArray5[2] },
    // { "id": 6, "costName": this._arrays._storeArray5[3] },
    // { "id": 7, "costName": this._arrays._storeArray5[4] },
    // { "id": 8, "costName": this._arrays._storeArray5[5] },// total per labor cost
    { "id": 3, "costName": this._arrays._storeArray7[0] },// labor cost/day
    { "id": 4, "costName": this._arrays._storeArray7[1] },
    { "id": 5, "costName": this._arrays._storeArray7[2] },
    { "id": 6, "costName": this._arrays._storeArray7[3] },
    { "id": 7, "costName": this._arrays._storeArray7[4] },
    { "id": 8, "costName": this._arrays._storeArray7[5] },// labor cost/day
    { "id": 9, "costName": this._arrays._storeArray6[0] },
    { "id": 10, "costName": this._arrays._storeArray6[1] },
    { "id": 11, "costName": this._arrays._storeArray6[2] },
    { "id": 12, "costName": this._arrays._storeArray6[3] }];
    }
    else{
      console.log("Vegetable : " +this.vegetable+ "Input cost " +this._arrays._storeArray1[0]);
      this._majorCosts = [
      { "id" : 0, "costName" : this._arrays._storeArray1[0] },
      { "id" : 1, "costName" : this._arrays._storeArray1[1] },
      { "id" : 2, "costName" : this._arrays._storeArray1[2] },
      { "id" : 3, "costName" : this._arrays._storeArray1[3] },
      { "id" : 4, "costName" : this._arrays._storeArray7[0]},
      { "id" : 5, "costName" : this._arrays._storeArray7[1]},
      { "id" : 6, "costName" : this._arrays._storeArray7[2]},
      { "id" : 7, "costName" : this._arrays._storeArray7[3]},
      { "id" : 8, "costName" : this._arrays._storeArray7[4]},
      { "id" : 9, "costName" : this._arrays._storeArray7[5]},
      { "id" : 10, "costName" : this._arrays._storeArray7[6]},
      { "id" : 11, "costName" : this._arrays._storeArray6[0]},
      { "id" : 12, "costName" : this._arrays._storeArray6[1]},
      { "id" : 13, "costName" : this._arrays._storeArray6[2]},
      { "id" : 14, "costName" : this._arrays._storeArray6[3]},
      { "id" : 15, "costName" : this._arrays._storeArray6[4]}];
    }
  }
 exitPage(){
    let promptAlert = this.alertCtrl.create({
      title: 'Expected price and expected harvest in kilo',
      inputs: [
        {
          name: 'price_kilo_carrots',
          placeholder: 'Enter Price',
          type: 'number'
        },
        {
          name: 'expected_kilo_carrots',
          placeholder: 'Kilo',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log("ppkc : " +data.price_kilo_carrots);
            if(data.price_kilo_carrots == '' || data.expected_kilo_carrots == ''){
              this.showErrorToast();
              return false;
            }
            else{
                this.saveDataInputs();
                this.viewCtrl.dismiss();
                this.app.getRootNav().push(SummaryInputsPage, { laborCost: this._subLaborCosts , price_kilo_carrots: data.price_kilo_carrots , expected_kilo_carrots: data.expected_kilo_carrots});
            }
          }
        }
      ]
    });
    promptAlert.present();
  }
  saveDataInputs(){
    console.log("Saving data");
    this._client_id = sessionStorage.getItem('client_id');
    if(this.vegetable == 'carrots'){
    console.log("client id : " +this._client_id);
    this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO carrots_expenses(rowid,seedlings,fertilizer,pesticide,clearing,bed_operations,planting,hilling_up,spraying,harvest,administrative_Cost,land_rental,packingMT,overhead_contigency) VALUES("'+this._client_id+'","'+this._majorCosts[0].costName+'","'+this._majorCosts[1].costName+'","'+this._majorCosts[2].costName+'","'+this._majorCosts[3].costName+'","'+this._majorCosts[4].costName+'","'+this._majorCosts[5].costName+'","'+this._majorCosts[6].costName+'","'+this._majorCosts[7].costName+'","'+this._majorCosts[8].costName+'","'+this._majorCosts[9].costName+'","'+this._majorCosts[10].costName+'","'+this._majorCosts[11].costName+
          '","'+this._majorCosts[12].costName+'")', {})
            .then(res => {
              console.log(res.message);
            }).catch(e => console.log(e.message));
                db.executeSql('INSERT INTO laborDetails(rowid,clearingMD,clearingNP,bed_operationsMD,bed_operationsNP,plantingMD,plantingNP,hilling_upMD,hilling_upNP,sprayingMD,sprayingNP,harvestMD,harvestNP,clearing_t,bed_operations_t,planting_t,hilling_up_t,spraying_t,harvest_t) VALUES("'+this._client_id+'","'+this._arrays._storeArray3[0]+'","'+this._arrays._storeArray2[0]+'","'+this._arrays._storeArray3[1]+'","'+this._arrays._storeArray2[1]+'","'+this._arrays._storeArray3[2]+'","'+this._arrays._storeArray2[2]+'","'+this._arrays._storeArray3[3]+'","'+this._arrays._storeArray2[3]+
                '","'+this._arrays._storeArray3[4]+'","'+this._arrays._storeArray2[4]+'","'+this._arrays._storeArray3[5]+'","'+this._arrays._storeArray2[5]+'","'+this._arrays._storeArray5[0]+'","'+this._arrays._storeArray5[1]+'","'+this._arrays._storeArray5[2]+'","'+this._arrays._storeArray5[3]+'","'+this._arrays._storeArray5[4]
                +'","'+this._arrays._storeArray5[5]+'")', {})
                .then(res => {
                  // console.log("Labor details Row ID : " +this._client_id);
                  // sessionStorage.setItem('lastRowID', String(this.lastID.rowid));
                  // console.log("Clearing Details : " +this._arrays._storeArray5[0]);
                  console.log(res.message);
                }).catch(e=> console.log(e.message));
          // }).catch(e => console.log(e));
        }).catch(e => console.log(e.message));
      }
      else{
        console.log("saving cabbage");
        console.log("client id : " +this._client_id);
        this.sqlite.create({
              name: 'ionicdb.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('INSERT INTO cabbage_expenses(rowid,seedlings,fertilizer,lime,pesticide,tilage,digging,planting,spraying,hilling_up,irrigation,harvest,administrative_Cost,land_rental,packingMaterials,transportation,overhead_contigency) VALUES("'+this._client_id+'","'+this._majorCosts[0].costName+'","'+this._majorCosts[1].costName+'","'+this._majorCosts[2].costName+'","'+this._majorCosts[3].costName+'","'+this._majorCosts[4].costName+'","'+this._majorCosts[5].costName+'","'+this._majorCosts[6].costName+'","'+this._majorCosts[7].costName+'","'+this._majorCosts[8].costName+'","'+this._majorCosts[9].costName+'","'+this._majorCosts[10].costName+'","'+this._majorCosts[11].costName+'","'+this._majorCosts[12].costName+
              '","'+this._majorCosts[13].costName+'","'+this._majorCosts[14].costName+'","'+this._majorCosts[15].costName+'")', {})
                .then(res => {
                  console.log(res.message);
                  console.log("saving cabbage details");
                }).catch(e => console.log(e.message));
                    db.executeSql('INSERT INTO cabbage_laborDetails(rowid,tilageMD,tilageNP,diggingMD,diggingNP,plantingMD,plantingNP,sprayingMD,sprayingNP,hilling_upMD,hilling_upNP,irrigationMD,irrigationNP,harvestMD,harvestNP,tilage_t,digging_t,planting_t,spraying_t,hilling_up_t,irrigation_t,harvest_t) VALUES("'+this._client_id+'","'+this._arrays._storeArray3[0]+'","'+this._arrays._storeArray2[0]+'","'+this._arrays._storeArray3[1]+'","'+this._arrays._storeArray2[1]+'","'+this._arrays._storeArray3[2]+'","'+this._arrays._storeArray2[2]+'","'+this._arrays._storeArray3[3]+'","'+this._arrays._storeArray2[3]+
                    '","'+this._arrays._storeArray3[4]+'","'+this._arrays._storeArray2[4]+'","'+this._arrays._storeArray3[5]+'","'+this._arrays._storeArray2[5]+'","'+this._arrays._storeArray3[6]+'","'+this._arrays._storeArray2[6]+'","'+this._arrays._storeArray5[0]+'","'+this._arrays._storeArray5[1]+'","'+this._arrays._storeArray5[2]+'","'+this._arrays._storeArray5[3]+'","'+this._arrays._storeArray5[4]
                    +'","'+this._arrays._storeArray5[5]+'","'+this._arrays._storeArray5[6]+'")', {})
                    .then(res => {
                      console.log("Labor details Row ID : " +this._client_id);
                      // sessionStorage.setItem('lastRowID', String(this.lastID.rowid));
                      console.log("Cabbage Clearing Details : " +this._arrays._storeArray5[0]);
                      console.log(res.message);
                    }).catch(e=> console.log(e.message));
              // }).catch(e => console.log(e));
            }).catch(e => console.log(e.message));
      }
  }
  showErrorToast(){
    let toast = this.toastCtrl.create({
      message: 'Please input values',
      duration: 3000,
      position: 'middle'
      });

    toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    });

    toast.present();
  }
  showLegends(){
    let legends = this.alertCtrl.create({
    title: 'Notice',
    subTitle: 'Legends for Labor Costs',
    message: '<p text-center><div>NP = Number of People</div><div>MD = Man Days</div><div>LC/D = Labor Cost/day</div><div>TC/L = Total Cost/labor</div></p>',
    buttons: ['Dismiss']
    });
    legends.present();
  }
}
