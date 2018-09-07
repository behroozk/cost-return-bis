import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { MenudatabasePage } from '../menudatabase/menudatabase';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ShowDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-data',
  templateUrl: 'show-data.html',
})
export class ShowDataPage {
  costID:string;
  data:string;
  dataRecord : any =[];
  rowID = [];
  vegetable:any;
  _isEmpty:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController , public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log('ionViewDidLoad ShowDataPage');
    this.selectSQL();
  }
  onItemClicked(rowID:string){
    console.log("Test : " +rowID);
    sessionStorage.setItem('rowID',rowID);
    let alert = this.alertCtrl.create({
      title: 'Notice',
      subTitle: 'Ipakita ang detalye sa data?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: () => {
          console.log('Buy clicked');
          this.navCtrl.push(MenudatabasePage);
        }
      }
      ]
      });
    alert.present();
  }
  selectSQL(){
    console.log("Reloading all data : " +this.vegetable);
    if(this.vegetable == 'carrots'){
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
          db.executeSql('SELECT * FROM client_details INNER JOIN carrots_calculated_values ON client_details.rowid = carrots_calculated_values.rowid',{})
          .then(res => {
            if(res.rows.length > 0){
              for(let rid=0; rid < res.rows.length; rid++){
              console.log("client location :" +res.rows.item(rid).client_location);
              this.dataRecord.push({id: res.rows.item(rid).rowid, name: res.rows.item(rid).client_name ,location: res.rows.item(rid).client_location ,cost: res.rows.item(rid).cost_total, time: res.rows.item(rid).date_recorded , gain: res.rows.item(rid).gain_total , money_return: res.rows.item(rid).money_return , expected_Kilo: res.rows.item(rid).expected_Kilo, expected_Price: res.rows.item(rid).expected_Price});
            }
          }
          else{
            this._isEmpty = true;
          }
          }).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
    }
    else{
      console.log("reloading cabbage");
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
          db.executeSql('SELECT * FROM client_details INNER JOIN cabbage_calculated_values ON client_details.rowid = cabbage_calculated_values.rowid',{})
          .then(res => {
            if(res.rows.length > 0){
              console.log("cabbage details : " +res.rows.length);
              for(let rid=0; rid < res.rows.length; rid++){
              console.log("Fetch data from cabbage_calculated_values : " +res.rows.item(rid).rowid + " RID : " +res.rows.item(rid).date_recorded);
              this.dataRecord.push({id: res.rows.item(rid).rowid, name: res.rows.item(rid).client_name ,cost: res.rows.item(rid).cost_total , time: res.rows.item(rid).date_recorded, gain: res.rows.item(rid).gain_total , money_return: res.rows.item(rid).money_return , expected_Kilo: res.rows.item(rid).expected_Kilo, expected_Price: res.rows.item(rid).expected_Price});
            }
          }
          else{
            this._isEmpty = true;
          }
          }).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
    }
  }
  openDelete(rowID:string){
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay : "+this.vegetable);
    this.costID = rowID;
    let alert = this.alertCtrl.create({
    title: 'Kompirmasyon',
    message: 'Ipadayun nga i-delete ni nga datus?',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
    handler: () => {
      console.log('Cancel clicked');
    }},
      {text: 'Confirm',
    handler: () => {
      console.log('Okay clicked');
      this.deleteSQL();
    }}
  ]});
  alert.present();
  }
  deleteSQL(){
    let alert = this.alertCtrl.create({
      title: 'Successfully Delete',
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          // user has clicked the alert button
          // begin the alert's dismiss transition
          let navTransition = alert.dismiss();
            navTransition.then(() => {
              this.navCtrl.popToRoot();
            });
          return false;
        }
      }]
      });
    if(this.vegetable == 'carrots'){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM carrots_calculated_values WHERE rowid=' +this.costID,{})
    .then(res => {
      console.log("Calculated values deleted successfully " +res.message);
    }).catch(e=> console.log(e.message));
      db.executeSql('DELETE FROM laborDetails WHERE rowid =' +this.costID,{})
    .then(res => {
      console.log("Labor details deleted successfully " +res.message);
    }).catch(e=> console.log(e.message));
      db.executeSql('DELETE FROM carrots_expenses WHERE rowid =' +this.costID,{})
    .then(res => {
      console.log("Carrot expenses deleted successfully " +res.message);
    }).catch(e=> console.log(e.message));
    }).catch(e=> console.log(e.message));
    // this.navCtrl.popToRoot();
    }
    else{
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM cabbage_calculated_values WHERE rowid=' +this.costID,{})
      .then(res => {
        console.log("Cabbage Calculated values deleted successfully " +res.message);
      }).catch(e=> console.log(e.message));
        db.executeSql('DELETE FROM cabbage_laborDetails WHERE rowid =' +this.costID,{})
      .then(res => {
        console.log("Cabbage Labor details deleted successfully " +res.message);
      }).catch(e=> console.log(e.message));
        db.executeSql('DELETE FROM cabbage_expenses WHERE rowid =' +this.costID,{})
      .then(res => {
        console.log("Cabbage expenses deleted successfully " +res.message);
      }).catch(e=> console.log(e.message));
      }).catch(e=> console.log(e.message));
      // this.navCtrl.popToRoot();
    }
    alert.present();
  }
}
