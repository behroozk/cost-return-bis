import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ArrayStorage } from '../../providers/data/data';
import { PopoverPage } from '../popover/popover';
/**
 * Generated class for the TabCostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-cost',
  templateUrl: 'tab-cost.html',
})
export class TabCostPage {
  private _costID:string;
  private tabCost:any=[];
  private _labor:any=[];
  private _subtotalCost:any=[];
  private vegetable:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    public _arrays: ArrayStorage , public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabCostPage');

  }
  ionViewWillEnter(){
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay : "+this.vegetable);
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
              console.log("Row length :" +res.rows.length);
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
            console.log("clearing : " +res.rows.item(0).clearing_t)
            this._labor.push({
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
          }
        }).catch(e=> console.log(e.message));
        db.executeSql('SELECT * FROM carrots_calculated_values WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
            console.log("Subtotal details query success :" +res.rows.length);
            this._subtotalCost.push({
              _inputs: res.rows.item(0).subTotal_inputs,
              _labor: res.rows.item(0).subTotal_Labor,
              _admin: res.rows.item(0).subTotal_admin});
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
              console.log("Row length :" +res.rows.length);
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
            console.log("clearing : " +res.rows.item(0).clearing_t)
            this._labor.push({
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
              _irrigationNP: res.rows.item(0).irrigationNP,
              _harvestMD: res.rows.item(0).harvestMD,
              _harvestNP: res.rows.item(0).harvestNP,
              _tilage_t: res.rows.item(0).tilage_t,
              _digging_t: res.rows.item(0).digging_t,
              _planting_t: res.rows.item(0).planting_t,
              _spraying_t: res.rows.item(0).spraying_t,
              _hilling_up_t: res.rows.item(0).hilling_up_t,
              _irrigation_t: res.rows.item(0).irrigation_t,
              _harvest_t: res.rows.item(0).harvest_t});
          }
        }).catch(e=> console.log(e.message));
        db.executeSql('SELECT * FROM cabbage_calculated_values WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
            console.log("Subtotal details query success :" +res.rows.length);
            this._subtotalCost.push({
              _inputs: res.rows.item(0).subTotal_inputs,
              _labor: res.rows.item(0).subTotal_Labor,
              _admin: res.rows.item(0).subTotal_admin});
          }
        }).catch(e=> console.log(e.message));
      }).catch(e=> console.log(e.message));
    }

  }
  ionViewWillLeave(){
    this.tabCost=[];
    this._labor=[];
    this._subtotalCost=[];
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
