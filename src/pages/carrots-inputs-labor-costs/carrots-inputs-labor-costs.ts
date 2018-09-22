import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';

// import { DataProvider } from '../../providers/data/data';
// import { ArrayStorage } from '../../providers/data/data';
import { VegetableCostListsProvider } from '../../providers/vegetable-cost-lists/vegetable-cost-lists';

import { ReviewInputsPage } from '../review-inputs/review-inputs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
  public default_Pay=100;
  public default=1;
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
  can_details:any = [];
  can_brand_name:any;
  toggleValue: boolean;
  // _canPrice:boolean;
  public _can:boolean = false;
  public _numCans:any;
  vegetable:any;
  inl:number;
  lcl:number;
  adl:number;

  // new declared values
  carrotsLaborList: any[];
  adminCostLists: any[];

  inputLists:any[];
  inputCost:any = [];
  laborLists:any[];
  laborCost:any = [];

  temporaryArray: any[] = [];
  sortedPaymentList: any[] = [];

  // public fixedCostIdentifier:any;
  public adminIdentifier:any;
  public laborIdentifier:any;
  public inputIdentifier:any;

  public showPaymentOptions:boolean = true;
  public showPaymentLists:any=[];

  public showPayment:boolean = false;

  public mandays:any=[];
  public mancost:any=[];
  public manpower:any=[];
  public inputsCost:any=[]; // store input values
  public laborCost:any=[];
  public foodcost:any=[];
  // public adminCost:any=[];  // store admin input values
  // public inputObject:any=[]; // store input object
  // public adminObject:any=[]; // store admin object

  public iconDown:boolean = false;
  // public inputCostActivity:boolean = true;
  // public adminCostActivity:boolean = true;
  // public laborCostActivity:boolean = true;
  public buttonChoicesMenu:boolean = true;

  public costInputs:boolean = false;  // show inputs of input , labor , food
  // public adminCostInputs:boolean = false; // show inputs of admin
  // public laborCostsInputs:boolean = false; // show inputs of labor inputs
  // public laborCostsOption:boolean = true;
  // public inputCostsOption:boolean = true;
  // public adminCostsOption:boolean = true;

  maxLength:any;
  laborClicked:any;

  laborLength:any;
  laborCost:any;
  list:any=[];
  public pay:any=[];
  prelim_data:any=[];
  //
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public carrotProvider: VegetableCostListsProvider,
  public modalCtrl: ModalController,
  private alertCtrl: AlertController,
  public cdRef:ChangeDetectorRef,
  private sqlite: SQLite) {
      this.toggleValue = true
  }
  getCarrotsCostList() {
    this.carrotsLaborList = this.carrotProvider.carrotsLaborListProvider();
    this.showPaymentLists = this.carrotProvider.paymentActivityListProvider();
    this.inputLists = this.carrotProvider.carrotsInputListProvider();
    this.laborLists = this.carrotProvider.laborActivityListProvider();
    this.adminCostLists = this.carrotProvider.carrotsAdminListProvider();
  }
  // buttonChoice(buttonChoice){
  //   console.log(buttonChoice);
  //   if(buttonChoice === 'Inputs' && this.inputCostsOption){
  //     this.inputCostsOption = false;
  //     this.laborCostActivity = false;
  //     this.adminCostActivity = false;
  //     this.iconDown = true;
  //   }
  //   else if(buttonChoice === 'Labor' && this.laborCostsOption){
  //     this.laborCostsOption = false;
  //     this.inputCostActivity = false;
  //     this.adminCostActivity = false;
  //     this.iconDown = true;
  //   }
  //   else if(buttonChoice === 'Administrative' && this.adminCostsOption){
  //     this.adminCostsOption = false;
  //     this.inputCostActivity = false;
  //     this.laborCostActivity = false;
  //     this.iconDown = true;
  //   }
  //   else if(buttonChoice === 'Inputs' && !this.inputCostsOption){
  //     this.inputCostsOption = true;
  //     this.laborCostActivity = true;
  //     this.adminCostActivity = true;
  //     this.iconDown = false;
  //   }
  //   else if(buttonChoice === 'Labor' && !this.laborCostsOption){
  //     this.laborCostsOption = true;
  //     this.inputCostActivity = true;
  //     this.adminCostActivity = true;
  //     this.iconDown = false;
  //   }
  //   else if(buttonChoice === 'Administrative' && !this.adminCostsOption){
  //     this.adminCostsOption = true;
  //     this.inputCostActivity = true;
  //     this.laborCostActivity = true;
  //     this.iconDown = false;
  //   }
  // }
  datachanged(e:any,laborId:any,labor:any){
    console.log(e);
    console.log(e.checked+", "+laborId+" ,"+labor);
    this.laborClicked = labor;
    this.showPaymentOptions = false;
    this.showPayment = true;
    }
    checkActivity(){
      this.costInputs = true;
      this.showPayment = false;
      this.buttonChoicesMenu = false;
      console.log("payments : "+this.pay);
      let viewCheckBoxes = this.pay.includes(true);
      console.log(viewCheckBoxes);
      if(this.payment != ''){
        if(viewCheckBoxes){
          this.sortedPaymentList = [];
            for (var i = 0; i < this.pay.length; i++) {
              if(this.pay[i]){
                console.log("true : "+i);
                this.sortedPaymentList.push({ id: i});
              }
            }
        }
      }
    }

    submitInputs(){
      
    }
  ionViewDidLoad() {
    // console.log("true ni?"+this.inputCostActivity);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('SELECT * FROM can_prices',{})
      .then(res => {
        if(res.rows.length > 0){
          console.log("PRICE SA TAKIIS " +res.rows.item(0).price);
            for(let rid=0; rid < res.rows.length; rid++){
              this.can_details.push({id: res.rows.item(rid).rowid, brand_name: res.rows.item(0).brand_name ,  price: res.rows.item(0).price});
            }
        }
      }).catch(e => console.log(e.message));
    }).catch(e => console.log(e.message));
    console.log('ionViewDidLoad CarrotsInputsLaborCostsPage');
    this.vegetable = 'carrots';
    console.log("gulay :" +this.vegetable);
    this.getCarrotsCostList();
  }
  //
  // checkActivity(activityType:number) {
  //   this.buttonChoicesMenu = false;
  //   var i;
  //   let viewCheckBoxes = this.list.includes(true);
  //   let alert = this.alertCtrl.create({title: 'Notice', subTitle: 'Please select activity',buttons: ['Dismiss']});
  //   if(this.list != ''){
  //     if(viewCheckBoxes){
  //       this.sortedLaborList = [];
  //       for (i = 0; i < this.list.length; i++) {
  //         if(this.list[i]){
  //           console.log("true : "+i);
  //           this.sortedLaborList.push({ id: i});
  //         }
  //       }
  //       if(activityType == 0){
  //         this.inputCostInputs = true;
  //         this.inputIdentifier = this.sortedLaborList;
  //       }
  //       else if(activityType == 1){
  //         this.laborCostsInputs = true;
  //         this.laborIdentifier = this.sortedLaborList;
  //       }else if(activityType == 2){
  //         this.adminCostInputs = true;
  //         this.adminIdentifier = this.sortedLaborList;
  //       }
  //       this.laborLength = this.sortedLaborList.length;
  //       let alert = this.alertCtrl.create({title: 'Notice', subTitle: 'The inputs that will be shown are the defaults. Please edit that suit for your reference',buttons: ['Dismiss']});
  //       alert.present(); }
  //     else{ alert.present(); }
  //   }
  //   else{ alert.present(); }
  // }
  // submitLaborInputs(number:number){
  //   for(let key1 of this.laborIdentifier){
  //     let labor_name = this.carrotsLaborList.find(i => i.id == key1.id);
  //         // console.log("labor name : "+labor_name.labor);
  //         // console.log("cost per labor: "+this.calculator.costPerLabor(this.mancost[key1],this.manpower[key1],this.mandays[key1]));
  //         this.prelim_data.push({ id:labor_name.id, manpower: this.manpower[key1.id], mancost: this.mancost[key1.id], mandays: this.mandays[key1.id], laborname: labor_name.labor });
  //   }
  //   if(number == 0){
  //     this.spawnModalPage();
  //   }
  //   else{
  //     this.buttonChoicesMenu = true;
  //     this.laborCostsInputs = false;
  //     this.laborCostActivity = false;
  //     this.inputCostActivity = true;
  //     this.adminCostActivity = true;
  //   }
  //   this.list =[];
  //   console.log(JSON.stringify(this.prelim_data));
  //   console.log("yeah :"+this.buttonChoicesMenu);
  // }
  //
  // submitInputs(numberSign:number){
  //   for(let findIdkey of this.inputIdentifier){
  //     let input_name = this.inputLists.find(i => i.id == findIdkey.id);
  //     this.inputObject.push({ id:input_name.id, inputName:input_name.input, cost:this.inputsCost[findIdkey.id]});
  //     }
  //   if(numberSign == 0){
  //     this.spawnModalPage();
  //   }
  //   else{
  //       this.buttonChoicesMenu = true;
  //       this.inputCostInputs = false;
  //       this.inputCostActivity = false;
  //       this.laborCostActivity = true;
  //       this.adminCostActivity = true;
  //   }
  //   console.log(JSON.stringify(this.inputObject));
  //   console.log("yeah :"+this.buttonChoicesMenu);
  //   this.list =[];
  // }
  // submitAdminInputs(signedNumber:number){
  //   for(let findId of this.adminIdentifier){
  //   // for(var ikey=0; ikey<this.sortedLaborList.length; ikey++){
  //     console.log(findId.id);
  //     let admin_name = this.adminCostLists.find(i => i.id == findId.id);
  //     console.log("admin name : "+admin_name.admin+" admin id : "+admin_name.id);
  //     this.adminObject.push({ id:admin_name.id, inputName:admin_name.admin, cost:this.adminCost[findId.id]});
  //     }
  //   if(signedNumber == 0){
  //     this.spawnModalPage();
  //   }
  //   else{
  //       this.buttonChoicesMenu = true;
  //       this.adminCostInputs = false;
  //       this.adminCostActivity = false;
  //       this.inputCostActivity = true;
  //       this.laborCostActivity = true;
  //     }
  //   console.log(JSON.stringify(this.adminObject));
  //   console.log("yeah :"+this.buttonChoicesMenu);
  //   this.list =[];
  // }
  spawnModalPage(){
    this.navCtrl.push(ReviewInputsPage, { labor:this.prelim_data, admin: this.adminObject, input: this.inputObject});
    // let profileModal = this.modalCtrl.create(ReviewInputsPage, { labor: this.prelim_data, admin: this.adminObject, input: this.inputObject});
    // profileModal.present();
  }
  // registerInputs(){
  //   if(this.vegetable == 'carrots'){
  //     this.inl = this.input_cost.length - 1;
  //     this.lcl = this._laborCost.length - 1;
  //     this.adl = this._adminCost.length - 1;
  //     console.log("inl : " +this.inl+ " lcl : " +this.lcl+ " adl : " +this.adl);
  //   }
  //   else{
  //     this.inl = this.input_cost.length;
  //     this.lcl = this._laborCost.length;
  //     this.adl = this._adminCost.length;
  //     console.log("inl : " +this.inl+ " lcl : " +this.lcl+ " adl : " +this.adl);
  //   }
  //   console.log("Calculating cost");
  //   for(let n = 0; n < this.inl; n++){
  //     if(!this.toggleValue && n==0){
  //       console.log("solving per can value price "+this.can_brand_name);
  //       this.input_cost[n] = this.can_brand_name * parseInt(this._numCans); // 1200 represents Takii`s brand of carrot seedlings
  //     }
  //     this._temporaryValue = this._temporaryValue + parseInt(this.input_cost[n]);
  //     console.log("Inputs cost Id no." + n + "total cost" + this._temporaryValue);
  //     this._cost[0] = this._temporaryValue;
  //     this.input_cost[n] = this.input_cost[n];
  //   }
  //   for(let labor = 0; labor < this.lcl; labor++){
  //     if(this._numDays[labor] == null){
  //       this._numDays[labor] = 1;
  //     }
  //     this._temporaryValue = ((this._numLabor[labor] * this._laborCost[labor]) * this._numDays[labor]);
  //     this._laborSubtotalCosts = this._laborSubtotalCosts + this._temporaryValue;
  //     // console.log("calculating labor costs " +this._laborSubtotalCosts+ "temporary value "+this._temporaryValue);
  //     console.log("numpeople : " +this._numLabor[labor]+ " numdays : " +this._numDays[labor]);
  //     this._perLaborCosts[labor] = this._temporaryValue;
  //   }
  //
  //   for(let admCost = 0; admCost < this.adl; admCost++){
  //     this._temporaryVal = this._temporaryVal + parseInt(this._adminCost[admCost]);
  //     console.log("Admin cost Id no." + admCost + "total cost" + this._adminCost[admCost]);
  //     this._cost[1] = this._temporaryVal;
  //     this._adminCost[admCost] = this._adminCost[admCost];
  //   }
  //   this._arrayStorage.setArray_1(this.input_cost);
  //   this._arrayStorage.setArray_2(this._numLabor);
  //   this._arrayStorage.setArray_3(this._numDays);
  //   this._arrayStorage.setArray_4(this._cost);
  //   this._arrayStorage.setArray_5(this._perLaborCosts);
  //   this._arrayStorage.setArray_6(this._adminCost);
  //   this._arrayStorage.setArray_7(this._laborCost);

  //   // this.navCtrl.push(ReviewInputsPage, {userId: this._laborSubtotalCosts })
  // }
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
    // console.log( "! error handle !" );
    this.cdRef.detectChanges();
    }
}
