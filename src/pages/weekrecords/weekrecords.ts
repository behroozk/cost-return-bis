import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServicesProvider } from '../../providers/database-services/database-services';
import { InputCostCalculatorProvider } from '../../providers/input-cost-calculator/input-cost-calculator';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the WeekrecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weekrecords',
  templateUrl: 'weekrecords.html',
})
export class WeekrecordsPage {
  public week_records: any = [];
  public _perWeekRecordInput: any;
  public _perWeekRecordLabor: any;
  public _perWeekRecordFood: any;
  public recordinputBool: boolean;
  public recordlaborBool: boolean;
  public recordfoodBool: boolean;

  public recordedInputSubtotalCost: any;
  public recordedlaborSubtotalCost: any;
  public recordedfoodSubtotal: any;

  public maxRecordedLength: any;
  public showRecords: any = [];

  private _thisWeekInputs: any = [];
  private _thisWeekLabor: any = [];
  private _thisWeekFood: any = [];
  constructor(
    public navCtrl: NavController,
    private dbServiceProvier: DatabaseServicesProvider,
    private calculator: InputCostCalculatorProvider,
    private sqlite: SQLite,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.showRecords = [];
    console.log('ionViewDidLoad WeekrecordsPage');
    var weekrecords = sessionStorage.getItem('weekRecords');
    this.week_records = JSON.parse(weekrecords);
    console.log(this.week_records.length);
    this.getTotalValues();
  }
  async getTotalValues() {
    for (let weekrecords of this.week_records) {
      await this.selectPresentWeekData(weekrecords.weekid, weekrecords.croppingid);
      this.loopThroughValues();
      this.loopObjectAccess();
      this.pushDataToShow(weekrecords.weekid);
    }
  }
  pushDataToShow(weekid) {
    this.showRecords.push({ week_id: weekid, inputcosts: this.recordedInputSubtotalCost, laborcosts: this.recordedlaborSubtotalCost, foodcosts: this.recordedfoodSubtotal });
  }
  loopThroughValues() {
    // var parseInput = sessionStorage.getItem('input');
    // var parseLabor = sessionStorage.getItem('labor');
    // var parseFood = sessionStorage.getItem('food');
    // console.log("input ->"+parseInput+" labor ->"+parseLabor+" food ->"+parseFood);
    this.recordinputBool = this.calculator.isEmpty(this._thisWeekInputs); // check if array is empty
    this.recordlaborBool = this.calculator.isEmpty(this._thisWeekLabor);
    this.recordfoodBool = this.calculator.isEmpty(this._thisWeekFood);
    this.calculator.emptyValues();
    this.maxRecordedLength = Math.max(this._thisWeekInputs.length, this._thisWeekLabor.length, this._thisWeekFood.length);
    console.log("max length =>" + this.maxRecordedLength + " input length =>" + this._thisWeekInputs.length + " labor length =>" + this._thisWeekLabor.length + " food length =>" + this._thisWeekFood.length);
  }

  loopObjectAccess() {
    for (var incre = 0; incre < this.maxRecordedLength; incre++) {
      this.accessObjectValues(incre);
      // console.log("week-id ->"+weekid+" inputcosts ->"+this.recordedInputSubtotalCost+" laborcosts ->"+this.recordedlaborSubtotalCost+" foodcosts ->"+this.recordedfoodSubtotal);
      // this.showRecords.push({ week_id: this.week_records[selector].weekid, inputcosts: this.recordedInputSubtotalCost, laborcosts: this.recordedlaborSubtotalCost, foodcosts: this.recordedfoodSubtotal});
    }
  }
  accessObjectValues(key) {
    if (!this.recordinputBool && key < this._thisWeekInputs.length) {
      // console.log("@weekrecords.ts --> input cost : "+this._thisWeekInputs[key].inputcost);
      this.recordedInputSubtotalCost = this.calculator.addingCost(this._thisWeekInputs[key].inputcost);
      console.log("input ->" + this.recordedInputSubtotalCost);
    }
    if (!this.recordlaborBool && key < this._thisWeekLabor.length) {
      var laborPerLaborTotalCost = this.calculator.costPerLabor(this._thisWeekLabor[key].mandays, this._thisWeekLabor[key].mancost, this._thisWeekLabor[key].manpower);
      this.recordedlaborSubtotalCost = this.calculator.subTotalLabor(laborPerLaborTotalCost);
      console.log(" subtotal per labor = " + this.recordedlaborSubtotalCost);
    }
    if (!this.recordfoodBool && key < this._thisWeekFood.length) {
      // console.log("@weekrecords.ts --> input cost : "+this._thisWeekFood[key].foodcost);
      this.recordedfoodSubtotal = this.calculator.addingFoodCost(this._thisWeekFood[key].foodcost);
      console.log("food cost ->" + this.recordedfoodSubtotal);
    }
  }
  selectPresentWeekData(weekid, cropid) {
    this._thisWeekInputs = [];
    this._thisWeekLabor = [];
    this._thisWeekFood = [];
    console.log('Collecting input data' + weekid + ' cropid ' + cropid);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM input_expenses WHERE input_expenses.week_input_rowid = "' + weekid + '" AND input_expenses.input_crop_rowid = "' + cropid + '"', {})
          .then(res => {
            if (res.rows.length > 0) {
              for (let rid = 0; rid < res.rows.length; rid++) {
                console.log("@databaseService.ts select inputs week->" + res.rows.item(rid).week_input_rowid + " crop->" + res.rows.item(rid).input_crop_rowid + " laborname->" + res.rows.item(rid).laborname_input + " inputname->" + res.rows.item(rid).inputname + " inputcost->" + res.rows.item(rid).laborname_input_cost);
                this._thisWeekInputs.push({ weekid: res.rows.item(rid).week_input_rowid, cropid: res.rows.item(rid).input_crop_rowid, laborname: res.rows.item(rid).laborname_input, inputname: res.rows.item(rid).inputname, inputcost: res.rows.item(rid).laborname_input_cost });
              }
            }
            // console.log("@dbservice provider week inputs obj->"+this._thisWeekInputs);
            // console.log("@dbservice stringify inputs->"+weekinputs);
            return db;
          })
      })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM labor_expenses WHERE labor_expenses.week_labor_rowid = "' + weekid + '" AND labor_expenses.labor_crop_rowid = "' + cropid + '"', {})
          .then(res => {
            if (res.rows.length > 0) {
              // console.log('Collecting input data');
              for (let lib = 0; lib < res.rows.length; lib++) {
                // console.log("@databaseService.ts select labor week->"+res.rows.item(lib).week_labor_rowid+" crop->"+res.rows.item(lib).labor_crop_rowid+" laborname->"+res.rows.item(lib).laborname_labor+" mancost->"+res.rows.item(lib).labor_mancost+" manpower->"+res.rows.item(lib).labor_manpower+" mandays->"+res.rows.item(lib).labor_mandays);
                this._thisWeekLabor.push({ weekid: res.rows.item(lib).week_labor_rowid, cropid: res.rows.item(lib).labor_crop_rowid, laborname: res.rows.item(lib).laborname_labor, mancost: res.rows.item(lib).labor_mancost, manpower: res.rows.item(lib).labor_manpower, mandays: res.rows.item(lib).labor_mandays });
              }
            }
            // console.log("@dbservice provider week labor obj->"+this._thisWeekLabor);
            // console.log("@dbservice stringify labor->"+weeklabor);
            return db;
          })
      })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM food_expenses WHERE food_expenses.week_food_rowid = "' + weekid + '" AND food_expenses.food_crop_rowid = "' + cropid + '"', {})
          .then(res => {
            if (res.rows.length > 0) {
              console.log('Collecting input data');
              for (let fid = 0; fid < res.rows.length; fid++) {
                // console.log("@databaseService.ts select food week->"+res.rows.item(fid).week_food_rowid+" crop->"+res.rows.item(fid).food_crop_rowid+" laborname->"+res.rows.item(fid).laborname_food+" foodcost->"+res.rows.item(fid).food_cost);
                this._thisWeekFood.push({ weekid: res.rows.item(fid).week_food_rowid, cropid: res.rows.item(fid).food_crop_rowid, laborname: res.rows.item(fid).laborname_food, foodcost: res.rows.item(fid).food_cost });
              }
            }
          })
      })
      .catch(e => console.log(e.message));
  }
}
