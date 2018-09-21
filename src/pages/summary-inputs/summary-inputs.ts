import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, LoadingController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { InputCostCalculatorProvider } from '../../providers/input-cost-calculator/input-cost-calculator';
import { VegetableCostListsProvider } from '../../providers/vegetable-cost-lists/vegetable-cost-lists';
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
  private input:any = [];
  private labor:any = [];
  private admin:any = [];
  private inputBool:boolean;
  private laborBool:boolean;
  private adminBool:boolean;
  private laborArray:any = [];
  private maxLength:any;

  private carrotsLaborList:any=[];
  private inputLists:any=[];
  private adminCostLists:any=[];
  private inputSubtotalCost:number = 0;
  private laborPerLaborTotalCost:number = 0;
  private laborSubtotalCost:number = 0;
  private adminUnitSubtotalCost:number = 0;
  private adminFixedSubtotalCost:number = 0;
  private adminViewTotalCost:number = 0;

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
  constructor(
    private calculator: InputCostCalculatorProvider,
    public carrotProvider: VegetableCostListsProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _arrays: ArrayStorage,
    public data: DataProvider,
    private sqlite: SQLite,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController) {
      this.input = this.navParams.get('input');
      this.labor = this.navParams.get('labor');
      this.admin = this.navParams.get('admin');
      this.inputBool = this.calculator.isEmpty(this.input); // check if array is empty
      this.laborBool = this.calculator.isEmpty(this.labor);
      this.adminBool = this.calculator.isEmpty(this.admin);
      this.calculator.emptyValues();
      this.maxLength = Math.max(this.input.length,this.labor.length,this.admin.length);
  }
  getCarrotsCostList() {
    this.carrotsLaborList = this.carrotProvider.carrotsLaborListProvider();
    this.inputLists = this.carrotProvider.carrotsInputListProvider();
    this.adminCostLists = this.carrotProvider.carrotsLaborListProvider();
  }
  public calculateValues(){
    for(var i=0; i < this.maxLength; i++){
      this.accessObjectValues(i);
    }
    // this.calculateOutput();
  }
  private accessObjectValues(key){
    if(!this.inputBool && key < this.input.length ){
      this.inputSubtotalCost = this.calculator.addingCost(this.input[key].cost);
    }
    if(!this.laborBool && key < this.labor.length ) {
      this.laborPerLaborTotalCost = this.calculator.costPerLabor(this.labor[key].mandays,this.labor[key].mancost,this.labor[key].manpower);
      this.laborArray.push({ id: this.labor[key].id, costPerLabor: this.laborPerLaborTotalCost});
      this.laborSubtotalCost = this.calculator.subTotalLabor(this.laborPerLaborTotalCost);
    }
    if(!this.adminBool && key < this.admin.length ) {
      if(this.admin[key].id >= 0 && this.admin[key].id <= 3){
        this.adminFixedSubtotalCost = this.calculator.adminfixedCost(this.admin[key].cost);
      }
      else{
        this.adminUnitSubtotalCost = this.calculator.adminunitCost(this.admin[key].cost);
      }
      this.adminViewTotalCost = this.adminFixedSubtotalCost + this.adminUnitSubtotalCost;
    }
  }
  ionViewDidLoad() {
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay :" +this.vegetable);
    console.log('ionViewDidLoad SummaryInputsPage');
  }
  ionViewDidEnter() {
    this.getCarrotsCostList();
    this.calculateValues();
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
    // if(this.vegetable == 'carrots'){
    // this.sqlite.create({
    //       name: 'ionicdb.db',
    //       location: 'default'
    //     }).then((db: SQLiteObject) => {
    //       db.executeSql('INSERT INTO carrots_calculated_values(rowid,subTotal_inputs,subTotal_Labor,subTotal_admin,gain_total,cost_total,roi_result,money_return,expected_Kilo,expected_Price) VALUES('+this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo+')', {})
    //         .then(res => {
    //           console.log(res.message);
    //           console.log("Calculated values saved : " +this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo);
    //         }).catch(e => console.log(e.message));
    //     }).catch(e => console.log(e.message));
    //   }
    //   else{
    //     this.sqlite.create({
    //           name: 'ionicdb.db',
    //           location: 'default'
    //         }).then((db: SQLiteObject) => {
    //           db.executeSql('INSERT INTO cabbage_calculated_values(rowid,subTotal_inputs,subTotal_Labor,subTotal_admin,gain_total,cost_total,roi_result,money_return,expected_Kilo,expected_Price) VALUES('+this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo+')', {})
    //             .then(res => {
    //               console.log(res.message);
    //               console.log("Calculated values saved : " +this._rowId+','+this._arrays._storeArray4[0]+','+this._laborCost+','+this._arrays._storeArray4[1]+','+this._gain+','+this._cost+','+this._roi+','+this._returnMoney+','+this.harvest_kilo+','+this.price_per_kilo);
    //             }).catch(e => console.log(e.message));
    //         }).catch(e => console.log(e.message));
    //   }
    //   return true;
  }
  backHome(){
    let toast = this.toastCtrl.create({
    message: 'Data added successfully',
    duration: 2000,
    position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.viewCtrl.dismiss();
    });

    toast.present();
  }
}
