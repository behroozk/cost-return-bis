import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { ArrayStorage } from '../../providers/data/data';

import { ReviewInputsPage } from '../review-inputs/review-inputs';
/**
 * Generated class for the CarrotsInputsLaborCostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrots-inputs-labor-costs',
  templateUrl: 'carrots-inputs-labor-costs.html',
})
export class CarrotsInputsLaborCostsPage {
  default_Pay=100;
  default_Day=1;
  // default_People=1;
  input_cost=[];  // inputs costs
  _laborCost=[]; // labor costs
  _numLabor=[]; // number of people
  _numDays=[]; // number of days
  _cost=[]; // sub-total costs
  _laborSubtotalCosts=0;
  _perLaborCosts=[];
  _adminCost=[]; // admin costs
  _temporaryValue=0;
  _temporaryVal=0;
  toggleValue: boolean;
  // _canPrice:boolean;
  public _can:boolean = false;
  public _numCans:any;
  vegetable:any;
  inl:number;
  lcl:number;
  adl:number;
  // item = [
  //   {day: 1},{day: 2},{day: 3},{day: 4},{day: 5},{day: 6},{day: 7},{day: 8},{day: 9}
  // ];
  // item : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _arrayStorage:ArrayStorage , public data: DataProvider , public modalCtrl: ModalController, private alertCtrl: AlertController, public cdRef:ChangeDetectorRef) {
      this.toggleValue = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrotsInputsLaborCostsPage');
    let alert = this.alertCtrl.create({title: 'Notice', subTitle: 'The inputs that will be shown are the defaults. Please edit that suit for your reference',buttons: ['Dismiss']});
    this.vegetable = sessionStorage.getItem('vegetable');
    console.log("gulay :" +this.vegetable);
    alert.present();
  }
  registerInputs(){
    if(this.vegetable == 'carrots'){
      this.inl = this.input_cost.length - 1;
      this.lcl = this._laborCost.length - 1;
      this.adl = this._adminCost.length - 1;
      console.log("inl : " +this.inl+ " lcl : " +this.lcl+ " adl : " +this.adl);
    }
    else{
      this.inl = this.input_cost.length;
      this.lcl = this._laborCost.length;
      this.adl = this._adminCost.length;
      console.log("inl : " +this.inl+ " lcl : " +this.lcl+ " adl : " +this.adl);
    }
    console.log("Calculating cost");
    for(let n = 0; n < this.inl; n++){
      if(!this.toggleValue && n==0){
        console.log("solving per can value");
        this.input_cost[n] = 1200 * parseInt(this._numCans); // 1200 represents Takii`s brand of carrot seedlings
      }
      this._temporaryValue = this._temporaryValue + parseInt(this.input_cost[n]);
      console.log("Inputs cost Id no." + n + "total cost" + this._temporaryValue);
      this._cost[0] = this._temporaryValue;
      this.input_cost[n] = this.input_cost[n];
    }
    for(let labor = 0; labor < this.lcl; labor++){
      if(this._numDays[labor] == null){
        this._numDays[labor] = 1;
      }
      this._temporaryValue = ((this._numLabor[labor] * this._laborCost[labor]) * this._numDays[labor]);
      this._laborSubtotalCosts = this._laborSubtotalCosts + this._temporaryValue;
      // console.log("calculating labor costs " +this._laborSubtotalCosts+ "temporary value "+this._temporaryValue);
      console.log("numpeople : " +this._numLabor[labor]+ " numdays : " +this._numDays[labor]);
      this._perLaborCosts[labor] = this._temporaryValue;
    }

    for(let admCost = 0; admCost < this.adl; admCost++){
      this._temporaryVal = this._temporaryVal + parseInt(this._adminCost[admCost]);
      console.log("Admin cost Id no." + admCost + "total cost" + this._adminCost[admCost]);
      this._cost[1] = this._temporaryVal;
      this._adminCost[admCost] = this._adminCost[admCost];
    }
    this._arrayStorage.setArray_1(this.input_cost);
    this._arrayStorage.setArray_2(this._numLabor);
    this._arrayStorage.setArray_3(this._numDays);
    this._arrayStorage.setArray_4(this._cost);
    this._arrayStorage.setArray_5(this._perLaborCosts);
    this._arrayStorage.setArray_6(this._adminCost);
    this._arrayStorage.setArray_7(this._laborCost);
    let profileModal = this.modalCtrl.create(ReviewInputsPage, { userId: this._laborSubtotalCosts });
    profileModal.present();
    // this.navCtrl.push(ReviewInputsPage, {userId: this._laborSubtotalCosts })
  }
    activatePopup(){
      console.log("toggle value : " +this.toggleValue);
      try{
        if(this.toggleValue){
          console.log("true");
          this._can = false;
        }
        else{
          this._can = true;
        }
      }
      catch(e){
        console.log(e);
      }

    }
    ngAfterViewChecked(){
    console.log( "! error handle !" );
    this.cdRef.detectChanges();
    }
}
