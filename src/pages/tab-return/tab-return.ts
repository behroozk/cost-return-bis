import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , PopoverController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DataProvider } from '../../providers/data/data';
import { PopoverPage } from '../popover/popover';
/**
 * Generated class for the TabReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-return',
  templateUrl: 'tab-return.html',
})
export class TabReturnPage {
  _totalCost:any=[];
  _costID:string;
  _roiPercent:any;
  private vegetable:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private sqlite: SQLite, public popoverCtrl: PopoverController, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabReturnPage');
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
      db.executeSql('SELECT * FROM carrots_calculated_values WHERE rowid =' +this._costID,{})
      .then(res => {
        if(res.rows.length > 0){
          console.log("Return tab details query success : " +res.rows.length);
          this._totalCost.push({
            _gainTotal : res.rows.item(0).gain_total,
            _costTotal : res.rows.item(0).cost_total,
            // _roi_result : res.rows.item(0).roi_result,
            _moneyReturn : res.rows.item(0).money_return,
            _expected_Kilo : res.rows.item(0).expected_Kilo,
            _expected_Price : res.rows.item(0).expected_Price});
            this._roiPercent = this.data.numToPercentage(res.rows.item(0).roi_result);
        }
      }).catch(e=> console.log(e.message));
    }).catch(e=> console.log(e.message));
    }
    else{
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM cabbage_calculated_values WHERE rowid =' +this._costID,{})
        .then(res => {
          if(res.rows.length > 0){
            console.log("Return tab details query success : " +res.rows.length);
            this._totalCost.push({
              _gainTotal : res.rows.item(0).gain_total,
              _costTotal : res.rows.item(0).cost_total,
              // _roi_result : res.rows.item(0).roi_result,
              _moneyReturn : res.rows.item(0).money_return,
              _expected_Kilo : res.rows.item(0).expected_Kilo,
              _expected_Price : res.rows.item(0).expected_Price});
              this._roiPercent = this.data.numToPercentage(res.rows.item(0).roi_result);
          }
        }).catch(e=> console.log(e.message));
      }).catch(e=> console.log(e.message));
    }
  }
  ionViewWillLeave(){
    this._totalCost=[];
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
