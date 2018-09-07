import { Component , ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ToastController } from 'ionic-angular';

import { ArrayStorage } from '../../providers/data/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { CostEditViewPage } from '../cost-edit-view/cost-edit-view';
/**
 * Generated class for the CostEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cost-edit',
  templateUrl: 'cost-edit.html',
})
export class CostEditPage {
  new_input_cost:any=[];  // inputs costs
  _new_laborCost=[]; // labor costs
  _new_numLabor=[]; // number of people
  _new_numDays=[]; // number of days
  _new_cost=[]; // sub-total costs
  _laborSubtotalCosts=0;
  _perLaborCosts=[];
  default_Day:number;
  _new_adminCost=[]; // admin costs
  _temporaryValue=0;
  _temporaryVal=0;
  // costIndex = 1;
  tabCost:any=[];
  _new_labor:any=[];
  vegetable:any;
  _costID:any;
  public _expectedKilo:any;
  public _expectedPrice:any;
  default_days: { id:number , days:any}[];
  // item : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private cdRef:ChangeDetectorRef, private alertCtrl: AlertController, public _arrayStorage:ArrayStorage , public toastCtrl: ToastController) {
  }
  ngAfterViewChecked(){
  console.log( "! error handle !" );
  this.cdRef.detectChanges();
  }
  ionViewDidLoad() {
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay :" +this.vegetable);
    console.log('ionViewDidLoad CostEditPage');
    this._costID = sessionStorage.getItem('rowID');
    console.log("Row ID : " +this._costID);
    if(this.vegetable == 'carrots'){
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM carrots_expenses WHERE rowid = '+this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
              console.log("Row length :" +res.rows.item(0).clearing);
            this.tabCost.push({
              seedlings: res.rows.item(0).seedlings,
              fertilizer: res.rows.item(0).fertilizer,
              pesticide: res.rows.item(0).pesticide,
              clearing: res.rows.item(0).clearing,
              bed_operations: res.rows.item(0).bed_operations,
              planting: res.rows.item(0).planting,
              hilling_up: res.rows.item(0).hilling_up,
              spraying: res.rows.item(0).spraying,
              harvest: res.rows.item(0).harvest,
              administrative_Cost: res.rows.item(0).administrative_Cost,
              land_rental: res.rows.item(0).land_rental,
              packingMT: res.rows.item(0).packingMT,
              overhead_contigency: res.rows.item(0).overhead_contigency});
          }
        }).catch(e=> console.log(e.message));
        db.executeSql('SELECT * FROM laborDetails WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
            console.log("Labor details query success :" +res.rows.length);
            console.log("man power " +res.rows.item(0).clearingMD);
            this._new_labor.push({
              _clearingMD: res.rows.item(0).clearingMD,
              _clearingNP: res.rows.item(0).clearingNP,
              _bed_operationsMD: res.rows.item(0).bed_operationsMD,
              _bed_operationsNP: res.rows.item(0).bed_operationsNP,
              _plantingMD: res.rows.item(0).plantingMD,
              _plantingNP: res.rows.item(0).plantingNP,
              _hilling_upMD: res.rows.item(0).hilling_upMD,
              _hilling_upNP: res.rows.item(0).hilling_upNP,
              _sprayingMD: res.rows.item(0).sprayingMD,
              _sprayingNP: res.rows.item(0).sprayingNP,
              _harvestMD: res.rows.item(0).harvestMD,
              _harvestNP: res.rows.item(0).harvestNP,
              _clearing_t: res.rows.item(0).clearing_t,
              _bed_operations_t: res.rows.item(0).bed_operations_t,
              _planting_t: res.rows.item(0).planting_t,
              _hilling_up_t: res.rows.item(0).hilling_up_t,
              _spraying_t: res.rows.item(0).spraying_t,
              _harvest_t: res.rows.item(0).harvest_t});
          this.default_days = [
            { "id": 0 , "days": res.rows.item(0).clearingMD},
            { "id": 1 , "days": res.rows.item(0).bed_operationsMD},
            { "id": 2 , "days": res.rows.item(0).plantingMD},
            { "id": 3 , "days": res.rows.item(0).hilling_upMD},
            { "id": 4 , "days": res.rows.item(0).sprayingMD},
            { "id": 5 , "days": res.rows.item(0).harvestMD}
          ];
          }
        }).catch(e=> console.log(e.message));
      }).catch(e=> console.log(e.message));
    }
    else{
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM cabbage_expenses WHERE rowid = '+this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
              console.log("Row length :" +res.rows.item(0).clearing);
            this.tabCost.push({
              seedlings: res.rows.item(0).seedlings,
              fertilizer: res.rows.item(0).fertilizer,
              lime: res.rows.item(0).lime,
              pesticide: res.rows.item(0).pesticide,
              tilage: res.rows.item(0).tilage,
              digging: res.rows.item(0).digging,
              planting: res.rows.item(0).planting,
              spraying: res.rows.item(0).spraying,
              hilling_up: res.rows.item(0).hilling_up,
              irrigation: res.rows.item(0).irrigation,
              harvest: res.rows.item(0).harvest,
              administrative_Cost: res.rows.item(0).administrative_Cost,
              land_rental: res.rows.item(0).land_rental,
              packingMaterials: res.rows.item(0).packingMaterials,
              transportation: res.rows.item(0).transportation,
              overhead_contigency: res.rows.item(0).overhead_contigency});
          }
        }).catch(e=> console.log(e.message));
        db.executeSql('SELECT * FROM cabbage_laborDetails WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
            console.log("Labor details query success :" +res.rows.length);
            console.log("man power " +res.rows.item(0).hilling_up_t);
            this._new_labor.push({
              _tilageMD: res.rows.item(0).tilageMD,
              _tilageNP: res.rows.item(0).tilageNP,
              _diggingMD: res.rows.item(0).diggingMD,
              _diggingNP: res.rows.item(0).diggingNP,
              _plantingMD: res.rows.item(0).plantingMD,
              _plantingNP: res.rows.item(0).plantingNP,
              _sprayingMD: res.rows.item(0).sprayingMD,
              _sprayingNP: res.rows.item(0).sprayingNP,
              _hilling_upMD: res.rows.item(0).hilling_upMD,
              _hilling_upNP: res.rows.item(0).hilling_upNP,
              _irrigationMD: res.rows.item(0).irrigationMD,
              _irrigationNP: res.rows.item(0).irrigationMD,
              _harvestMD: res.rows.item(0).harvestMD,
              _harvestNP: res.rows.item(0).harvestNP,
              _tilage_t: res.rows.item(0).tilage_t,
              _digging_t: res.rows.item(0).digging_t,
              _planting_t: res.rows.item(0).planting_t,
              _spraying_t: res.rows.item(0).spraying_t,
              _hilling_up_t: res.rows.item(0).hilling_up_t,
              _irrigation_t: res.rows.item(0).irrigation_t,
              _harvest_t: res.rows.item(0).harvest_t});
          this.default_days = [
            { "id": 0 , "days": res.rows.item(0).tilageMD},
            { "id": 1 , "days": res.rows.item(0).diggingMD},
            { "id": 2 , "days": res.rows.item(0).plantingMD},
            { "id": 3 , "days": res.rows.item(0).sprayingMD},
            { "id": 4 , "days": res.rows.item(0).hilling_upMD},
            { "id": 5 , "days": res.rows.item(0).irrigationMD},
            { "id": 6 , "days": res.rows.item(0).harvestMD}
          ];
          }
        }).catch(e=> console.log(e.message));
        db.executeSql('SELECT * FROM cabbage_calculated_values WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
              this._expectedKilo = res.rows.item(0).expected_Kilo;
              this._expectedPrice = res.rows.item(0).expected_Price;
          }
          console.log("expected kilo : " +this._expectedKilo+ " expeceted harvest : " +this._expectedPrice);
        }).catch(e=> console.log(e.message));
      }).catch(e=> console.log(e.message));
    }
  }

  updateInputs(){
    let alert = this.alertCtrl.create({
    title: 'Notice',
    message: 'Expected price and expected harvest in kilo first input is the price the second is the kilo',
    inputs: [
      {
        name: 'price_kilo_carrots',
        placeholder: 'Enter Price',
        type: 'number',
        value: this._expectedPrice
      },
      {
        name: 'expected_kilo_carrots',
        placeholder: 'Kilo',
        type: 'number',
        value: this._expectedKilo
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
        text: 'Ok',
        handler: data => {
          this.processData();
          if(data.price_kilo_carrots == '' || data.expected_kilo_carrots == ''){
            this.showErrorToast();
          }
          else{
          sessionStorage.setItem('price_per_kilo', String(data.price_kilo_carrots));
          sessionStorage.setItem('expected_harvest', String(data.expected_kilo_carrots));
          this.navCtrl.push(CostEditViewPage, {fail:true}).catch(()=>{
            console.log("Page didnt load")});
        }
      }
      }
    ]
  });
  alert.present();
  }
  processData(){
    for(let n = 0; n < this.new_input_cost.length; n++){
      console.log("carrots length :" +this.new_input_cost.length);
      this._temporaryValue = this._temporaryValue + parseInt(this.new_input_cost[n]);
      this._new_cost[0] = this._temporaryValue; // total for cost inputs
      this.new_input_cost[n] = this.new_input_cost[n]; // all input costs
      console.log("Inputs cost Id no. : " + n + " value : " + this.new_input_cost[n]);
    }
    for(let labor = 0; labor < this._new_laborCost.length; labor++){
      if(this._new_numDays[labor] == null){
        // console.log("num days  : " +this.default_days[labor].days);
        this._new_numDays[labor] = this.default_days[labor].days;
      }
      // console.log("labor id : " +labor+ " check : " +this._new_numDays[labor]);
      // console.log("Num labor : " +this._new_numLabor[labor]);
      this._temporaryValue = (this._new_numLabor[labor] * this._new_laborCost[labor]) * (this._new_numDays[labor]);
      // console.log("temporary value : " +this._temporaryValue);
      this._laborSubtotalCosts = this._laborSubtotalCosts + this._temporaryValue; // _laborSubtotalCosts = total for all labor costs
      // console.log("calculating labor costs " +this._laborSubtotalCosts+ "temporary value "+this._temporaryValue);
      this._perLaborCosts[labor] = this._temporaryValue;  // per labor total costs
    }

    for(let admCost = 0; admCost < this._new_adminCost.length; admCost++){
      this._temporaryVal = this._temporaryVal + parseInt(this._new_adminCost[admCost]);
      console.log("Admin cost Id no." + admCost + "total cost" + this._temporaryVal);
      this._new_cost[1] = this._temporaryVal; // admin_total cost
      this._new_adminCost[admCost] = this._new_adminCost[admCost]; // all admin costs
    }
    sessionStorage.setItem('laborCost',String(this._laborSubtotalCosts)); // labor subtotal costs
    this._arrayStorage.setArray_1(this.new_input_cost); // input costs

    this._arrayStorage.setArray_2(this._new_numLabor);
    this._arrayStorage.setArray_3(this._new_numDays);
    this._arrayStorage.setArray_4(this._new_cost); // total cost of inputs and admin
    this._arrayStorage.setArray_5(this._perLaborCosts); // total costs per labor

    this._arrayStorage.setArray_6(this._new_adminCost); // admin costs
    this._arrayStorage.setArray_7(this._new_laborCost); // cost per person
    // let profileModal = this.modalCtrl.create(ReviewInputsPage, { userId: this._laborSubtotalCosts });
    // profileModal.present();
  }
  showErrorToast(){
    let toast = this.toastCtrl.create({
      message: 'Please input values',
      duration: 1000,
      position: 'middle'
      });

    toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    });

    toast.present();
  }
}
