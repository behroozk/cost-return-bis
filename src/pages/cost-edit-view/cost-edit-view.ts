import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { ArrayStorage } from '../../providers/data/data';
// import { HomePage } from '../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the CostEditViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cost-edit-view',
  templateUrl: 'cost-edit-view.html',
})
export class CostEditViewPage {
  _new_subTotalinputCost:any;
  _new_subTotalLaborCost:any;
  _new_subTotalAdminCost:any;

  _new_labor_details: any = [];
  // _new_majorCosts: { id:number, costName: string }[];
  // _new_majorCosts: { id:number, costName:any}[];
  //
  _new_majorCosts:any=[];
  _new_cost:number;
  _new_gain:number;
  _new_roi:number;
  _new_returnMoney:any;
  _new_roiPercentage:any;
  _new_price_per_kilo:any;
  _new_harvest_kilo:any;

  e1 = true;
  e2 = true;
  _newInputCost='';
  _newLaborCost='';
  _newAdminCost='';

  _costID:any;
  index=0;
  vegetable:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _arrays: ArrayStorage, private sqlite: SQLite, private loadingCtrl : LoadingController , public data: DataProvider , public alertCtrl: AlertController) {
  }
  ionViewDidEnter(){

  }
  ionViewWillEnter() {
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
    this.vegetable = sessionStorage.getItem('vegetable');
    this._newInputCost = this._arrays._storeArray1;
    this._newLaborCost = this._arrays._storeArray7;
    this._newAdminCost = this._arrays._storeArray6;

    this._costID = sessionStorage.getItem('rowID');
    this._new_price_per_kilo = parseInt(sessionStorage.getItem('price_per_kilo'));
    this._new_harvest_kilo = parseInt(sessionStorage.getItem('expected_harvest'));

    if(this.vegetable == 'carrots'){
      for(let id=0; id<=12; id++){
        if(id < 3){
          this._new_majorCosts.push({ "id": id , "costName": this._newInputCost[this.index]});
          console.log("carrots :"+id+" index value : " +this.index+" value :" +this._new_majorCosts[id].costName);
        }
        else if(id >= 3 && id <9){
          this._new_majorCosts.push({ "id": id , "costName": this._newLaborCost[this.index]});
          console.log("carrots :"+id+" index value : " +this.index+" value :" +this._new_majorCosts[id].costName);
        }
        else if(id >= 9 && id <=12){
          this._new_majorCosts.push({ "id": id , "costName": this._newAdminCost[this.index]});
          console.log("carrots :"+id+" index value : " +this.index+" value :" +this._new_majorCosts[id].costName);
        }
        this.index ++;
        if(this.index == 3 && this.e1 == true){
          this.e1 = false;
          console.log("first");
          this.index=0;
        }
        else if(this.index == 6 && this.e1 == false){
          this.e2 = false;
          console.log("second");
          this.index=0;
        }
      }
      for(let details=0; details<=5; details++){
        this._new_labor_details.push({ "id": details, "days": this._arrays._storeArray3[details], "cost": this._arrays._storeArray5[details], "manpower": this._arrays._storeArray2[details]});
        console.log("cabbage :" +details+ " days: "+this._arrays._storeArray3[details]+ " cost : "+this._arrays._storeArray5[details]+ " manpower : "+this._arrays._storeArray2[details]);
      }
    }
    else{
      for(let id=0; id<=15; id++){
        if(id < 4){
          this._new_majorCosts.push({ "id": id , "costName": this._newInputCost[this.index]});
          console.log("cabbage :"+id+" index value : " +this.index+" value :" +this._new_majorCosts[id].costName);
        }
        else if(id >= 4 && id <11){
          this._new_majorCosts.push({ "id": id , "costName": this._newLaborCost[this.index]});
          console.log("cabbage :"+id+" index value : " +this.index+ " value :" +this._new_majorCosts[id].costName);
        }
        else if(id > 10 && id <=15){
          this._new_majorCosts.push({ "id": id , "costName": this._newAdminCost[this.index]});
          console.log("cabbage :"+id+" index value : " +this.index+ " value :" +this._new_majorCosts[id].costName);
        }
        this.index ++;
        if(this.index == 4 && this.e1 == true){
          this.e1 = false;
          console.log("first");
          this.index=0;
        }
        else if(this.index == 7 && this.e1 == false){
          this.e2 = false;
          console.log("second");
          this.index=0;
        }

      }
      for(let details=0; details<=6; details++){
        this._new_labor_details.push({ "id": details, "days": this._arrays._storeArray3[details], "cost": this._arrays._storeArray5[details], "manpower": this._arrays._storeArray2[details]});
        console.log("cabbage :" +details+ " days: "+this._arrays._storeArray3[details]+ " cost : "+this._arrays._storeArray5[details]+ " manpower : "+this._arrays._storeArray2[details]);
      }
    }
    this._new_subTotalinputCost = parseInt(this._arrays._storeArray4[0]);
    this._new_subTotalLaborCost = parseInt(sessionStorage.getItem('laborCost'));
    this._new_subTotalAdminCost = parseInt(this._arrays._storeArray4[1]);
    this.returnComputations();
  }

  returnComputations(){
    this._new_cost = this.data.costCalculator(this._new_subTotalinputCost,this._new_subTotalLaborCost,this._new_subTotalAdminCost);
    this._new_gain = this.data.gainCalculator(this._new_price_per_kilo,this._new_harvest_kilo);
    this._new_roi = this.data.returnOfInvestmentValue(this._new_cost,this._new_gain);
    this._new_roiPercentage = this.data.numToPercentage(this._new_roi);
    this._new_returnMoney = this.data.moneyReturn(this._new_roi,this._new_cost);
    console.log("cost : " +this._new_cost+ " gain :" +this._new_gain + " roi : " +this._new_roi + "roi percentage : " +this._new_roiPercentage +" returnMoney : " +this._new_returnMoney);
    if(this.vegetable == 'carrots'){
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // CREATE TABLE IF NOT EXISTS carrots_expenses(rowid INTEGER PRIMARY KEY, seedlings TEXT, fertilizer TEXT, pesticide TEXT, clearing TEXT, bed_operations TEXT, planting TEXT, hilling_up TEXT, spraying TEXT, harvest TEXT, administrative_Cost TEXT, land_rental TEXT, packingMT TEXT, overhead_contigency TEXT)', {})
        // .then(res => console.log('Executed SQL carrots_expenses'))
        db.executeSql('UPDATE carrots_expenses SET seedlings="'+this._new_majorCosts[0].costName+'",fertilizer="'+this._new_majorCosts[1].costName+'",pesticide="'+this._new_majorCosts[2].costName+'",clearing="'+this._new_majorCosts[3].costName+'",bed_operations="'+this._new_majorCosts[4].costName+'",planting="'+this._new_majorCosts[5].costName+'",hilling_up="'+this._new_majorCosts[6].costName+
        '",spraying="'+this._new_majorCosts[7].costName+'",harvest="'+this._new_majorCosts[8].costName+'",administrative_Cost="'+this._new_majorCosts[9].costName+'",land_rental="'+this._new_majorCosts[10].costName+'",packingMT="'+this._new_majorCosts[11].costName+'",overhead_contigency="'+this._new_majorCosts[12].costName+'"WHERE rowid='+this._costID+'',{})
        .then(res => console.log('Update carrot expenses')).catch(e => console.log(e.message));
        db.executeSql('UPDATE laborDetails SET clearingMD="'+this._new_labor_details[0].days+'",clearingNP="'+this._new_labor_details[0].manpower+'",bed_operationsMD="'+this._new_labor_details[1].days+'",bed_operationsNP="'+this._new_labor_details[1].manpower+'",plantingMD="'+this._new_labor_details[2].days+'",plantingNP="'+this._new_labor_details[2].manpower+'",hilling_upMD="'+this._new_labor_details[3].days+
        '",hilling_upNP="'+this._new_labor_details[3].manpower+'",sprayingMD="'+this._new_labor_details[4].days+'",sprayingNP="'+this._new_labor_details[4].manpower+'",harvestMD="'+this._new_labor_details[5].days+'",harvestNP="'+this._new_labor_details[5].manpower+'",clearing_t="'+this._new_labor_details[0].cost+'",bed_operations_t="'+this._new_labor_details[1].cost+
        '",planting_t="'+this._new_labor_details[2].cost+'",hilling_up_t="'+this._new_labor_details[3].cost+'",spraying_t="'+this._new_labor_details[4].cost+'", harvest_t="'+this._new_labor_details[5].cost+'"WHERE rowid='+this._costID+'',{} )
        .then(res => console.log('Update labor details')).catch(e => console.log(e.message));
        db.executeSql('UPDATE carrots_calculated_values SET subTotal_inputs="'+this._new_subTotalinputCost+'",subTotal_Labor="'+this._new_subTotalLaborCost+'",subTotal_admin="'+this._new_subTotalAdminCost+'",gain_total="'+this._new_gain+'",cost_total="'+this._new_cost+'",roi_result="'+this._new_roi+'",money_return="'+this._new_returnMoney+'",expected_Kilo="'+this._new_harvest_kilo+'",expected_Price="'+this._new_price_per_kilo+ '"WHERE rowid='+this._costID+'',{})
        .then(res => console.log('Update carrots calculated values')).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
    }
    else{
      console.log("man power ! : " +this._new_labor_details[5].manpower+ " pasd: " +this._new_labor_details[5].days);
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // CREATE TABLE IF NOT EXISTS carrots_expenses(rowid INTEGER PRIMARY KEY, seedlings TEXT, fertilizer TEXT, pesticide TEXT, clearing TEXT, bed_operations TEXT, planting TEXT, hilling_up TEXT, spraying TEXT, harvest TEXT, administrative_Cost TEXT, land_rental TEXT, packingMT TEXT, overhead_contigency TEXT)', {})
        // .then(res => console.log('Executed SQL carrots_expenses'))
        db.executeSql('UPDATE cabbage_expenses SET seedlings="'+this._new_majorCosts[0].costName+'",fertilizer="'+this._new_majorCosts[1].costName+'",lime="'+this._new_majorCosts[2].costName+'",pesticide="'+this._new_majorCosts[3].costName+'",tilage="'+this._new_majorCosts[4].costName+'",digging="'+this._new_majorCosts[5].costName+'",planting="'+this._new_majorCosts[6].costName+'",spraying="'+this._new_majorCosts[7].costName+'",hilling_up="'+this._new_majorCosts[8].costName+'",irrigation="'+this._new_majorCosts[9].costName+'",harvest="'+this._new_majorCosts[10].costName+'",administrative_Cost="'+this._new_majorCosts[11].costName+'",land_rental="'+this._new_majorCosts[12].costName+'",packingMaterials="'+this._new_majorCosts[13].costName+'",transportation="'+this._new_majorCosts[14].costName+'",overhead_contigency="'+this._new_majorCosts[15].costName+'"WHERE rowid='+this._costID+'',{})
        .then(res => console.log('Update cabbage expenses')).catch(e => console.log(e.message));
        db.executeSql('UPDATE cabbage_laborDetails SET tilageMD="'+this._new_labor_details[0].days+'",tilageNP="'+this._new_labor_details[0].manpower+'",diggingMD="'+this._new_labor_details[1].days+'",diggingNP="'+this._new_labor_details[1].manpower+'",plantingMD="'+this._new_labor_details[2].days+'",plantingNP="'+this._new_labor_details[2].manpower+'",sprayingMD="'+this._new_labor_details[3].days+
        '",sprayingNP="'+this._new_labor_details[3].manpower+'",hilling_upMD="'+this._new_labor_details[4].days+'",hilling_upNP="'+this._new_labor_details[4].manpower+'",irrigationMD="'+this._new_labor_details[5].days+'",irrigationNP="'+this._new_labor_details[5].manpower+'",harvestMD="'+this._new_labor_details[6].days+'",harvestNP="'+this._new_labor_details[6].manpower+'",tilage_t="'+this._new_labor_details[0].cost+'",digging_t="'+this._new_labor_details[1].cost+'",planting_t="'
        +this._new_labor_details[2].cost+'",spraying_t="'+this._new_labor_details[3].cost+'",hilling_up_t="'+this._new_labor_details[4].cost+'", irrigation_t="'+this._new_labor_details[5].cost+'", harvest_t="'+this._new_labor_details[6].cost+'"WHERE rowid='+this._costID+'',{} )
        .then(res => console.log('Update cabbage labor details')).catch(e => console.log(e.message));
        db.executeSql('UPDATE cabbage_calculated_values SET subTotal_inputs="'+this._new_subTotalinputCost+'",subTotal_Labor="'+this._new_subTotalLaborCost+'",subTotal_admin="'+this._new_subTotalAdminCost+'",gain_total="'+this._new_gain+'",cost_total="'+this._new_cost+'",roi_result="'+this._new_roi+'",money_return="'+this._new_returnMoney+'",expected_Kilo="'+this._new_harvest_kilo+'",expected_Price="'+this._new_price_per_kilo+ '"WHERE rowid='+this._costID+'',{})
        .then(res => console.log('Update cabbage calculated values')).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
    }
  }
  exitPage(){
    this.navCtrl.popToRoot();
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
