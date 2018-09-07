import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// import { MenudatabasePage } from '../menudatabase/menudatabase';
// import { HomePage } from '../home/home';
import { ArrayStorage } from '../../providers/data/data';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the SummaryInputsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary-inputs',
  templateUrl: 'summary-inputs.html',
})
export class SummaryInputsPage {
  // _totalCost='';
  _laborCost='';
  price_per_kilo: number;
  harvest_kilo: number;
  _gain: number;
  _cost: number;
  _roi: number;
  _returnMoney: number;
  _roiPercentage: number;
  _rowId: any;
  public vegetable:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _arrays: ArrayStorage,
    public data: DataProvider, private sqlite: SQLite, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay :" +this.vegetable);
    console.log('ionViewDidLoad SummaryInputsPage');
  }
  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">Calculating...</div>
        </div>`,
        duration: 1500
    });
    loading.present();
    // this._totalCost = this._arrays._storeArray4; // total cost inputs,fertilizer
    this._laborCost = this.navParams.get('laborCost');  // total labor costs
    this.price_per_kilo = this.navParams.get('price_kilo_carrots');
    this.harvest_kilo = this.navParams.get('expected_kilo_carrots');
    this._rowId = sessionStorage.getItem('client_id');
    this._cost = this.data.costCalculator(this._arrays._storeArray4[0],this._laborCost,this._arrays._storeArray4[1]);
    this._gain = this.data.gainCalculator(this.price_per_kilo,this.harvest_kilo);
    this._roi = this.data.returnOfInvestmentValue(this._cost,this._gain);
    this._roiPercentage = this.data.numToPercentage(this._roi);
    this._returnMoney = this.data.moneyReturn(this._roi,this._cost);
    console.log("cost : " +this._cost+ " gain :" +this._gain + " roi : " +this._roi + "rowid : " +this._rowId);
    this.saveData();
  }
  saveData(){
    if(this.vegetable == 'carrots'){
    this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO carrots_calculated_values(rowid,subTotal_inputs,subTotal_Labor,subTotal_admin,gain_total,cost_total,roi_result,money_return,expected_Kilo,expected_Price) VALUES('+this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo+')', {})
            .then(res => {
              console.log(res.message);
              console.log("Calculated values saved : " +this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo);
            }).catch(e => console.log(e.message));
        }).catch(e => console.log(e.message));
      }
      else{
        this.sqlite.create({
              name: 'ionicdb.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('INSERT INTO cabbage_calculated_values(rowid,subTotal_inputs,subTotal_Labor,subTotal_admin,gain_total,cost_total,roi_result,money_return,expected_Kilo,expected_Price) VALUES('+this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo+')', {})
                .then(res => {
                  console.log(res.message);
                  console.log("Calculated values saved : " +this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo);
                }).catch(e => console.log(e.message));
            }).catch(e => console.log(e.message));
      }
      return true;
  }
  backHome(){
    let toast = this.toastCtrl.create({
    message: 'Data added successfully',
    duration: 2000,
    position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.navCtrl.popToRoot();
    });

    toast.present();
  }
}
