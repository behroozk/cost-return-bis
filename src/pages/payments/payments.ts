import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';

import { VegetableCostListsProvider } from '../../providers/vegetable-cost-lists/vegetable-cost-lists';
import { InputCostCalculatorProvider } from '../../providers/input-cost-calculator/input-cost-calculator';
import { ReviewInputsPage } from '../review-inputs/review-inputs';
/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  private laborId:any;
  private laborName:any;

  public showPaymentLists:any= [];
  public pay:any = [];
  public sortedPaymentList:any = [];

  public costInputs:boolean = false;
  public paymentChoices:boolean = true;
  public showInputs:boolean = false;

  public default_Pay:number = 100;

  public inputsCost:any = [];
  public laborCost:any = [];
  public foodcost:any;

  public inputChoices:any = [];
  public sortedInputs:any = [];

  public tempoValueInput:any = [];
  public tempoValueLabor:any = [];
  public tempoValueFood:any = [];

  constructor(
    public navCtrl: NavController,
    public carrotProvider: VegetableCostListsProvider,
    public alertCtrl : AlertController,
    public cdRef:ChangeDetectorRef,
    public loadingCtrl: LoadingController,
    public inputCalculatorProvider: InputCostCalculatorProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {

    this.laborId = navParams.get('laborId');
    this.laborName = navParams.get('laborTitle');
    this.showPaymentLists = this.carrotProvider.paymentActivityListProvider();
    this.inputLists = this.carrotProvider.carrotsInputListProvider();
    this.laborLists = this.carrotProvider.laborActivityListProvider();
    this.adminCostLists = this.carrotProvider.carrotsAdminListProvider();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }
  checkPayableActivity(){
    this.paymentChoices = false;
    let viewCheckBoxes = this.pay.includes(true);
    if(this.payment != ''){
      if(viewCheckBoxes){
        this.sortedPaymentList = [];
          for (var i = 0; i < this.pay.length; i++) {
            if(this.pay[i]){
              if(i == 0){
                this.showInputs = true;
              }
              console.log("true : "+i);
              this.sortedPaymentList.push({ id: i});
            }
          }
      }
    }
  }
  inputsChoices(){
    this.costInputs = true;
    this.showInputs = false;
    let inputChoicesBoxes = this.inputChoices.includes(true);
    if(this.inputChoices != ''){
      if(inputChoicesBoxes){
        this.sortedInputs = [];
        for (var xy = 0; xy < this.inputChoices.length; xy++) {
          if(this.inputChoices[xy]){
            console.log("input choices : "+xy);
            this.sortedInputs.push({ id: xy});
          }
        }
      }
    }

  }
  submitInputsPayableActivity(){
    let loading = this.loadingCtrl.create({
    content: 'Reloading Activities'
    });
    let loadingExit = this.loadingCtrl.create({
    content: 'Preparing data inputs'
    });
    let checkAnotherActivity = this.alertCtrl.create({
      title: 'Confirm inputs',
    message: 'Do you have another activity?',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
          this.temporarySave();
          loading.present();
          setTimeout(() =>{
            checkAnotherActivity.dismiss();
            this.viewCtrl.dismiss();
            loading.dismiss();
          }, 500);
        }
      },
      {
        text: 'None',
        role: 'cancel',
        handler: () => {
          console.log('No clicked');
          this.viewCtrl.dismiss();
          loadingExit.present();
          setTimeout(() =>{
            loadingExit.dismiss();
            this.navCtrl.push(ReviewInputsPage);
          }, 500);
        }
      }
    ]
    });
    checkAnotherActivity.present();
  }
  temporarySave(){
    if(!this.inputCalculatorProvider.isEmpty(this.inputsCost)){
      for(var tempoInput = 0; tempoInput < 3; tempoInput++){
          if(this.inputsCost[tempoInput]){
            // console.log("labor id --> "+this.laborId+ " labor name --> "+this.laborName+" input name -> "+this.inputLists[tempoInput].input+" input gasto ->" +this.inputsCost[tempoInput]+ " id -> "+tempoInput);
            this.tempoValueInput.push({ input_name: this.inputLists[tempoInput].input, inputcost: this.inputsCost[tempoInput]});
        }
      }
    }
    if(!this.inputCalculatorProvider.isEmpty(this.laborCost)){
        // console.log("labor name -->"+this.laborName+" mandays -->"+this.laborCost[0]+ " manpower -->"+this.laborCost[1]+" mancost"+this.laborCost[2]);
        this.tempoValueLabor.push({ mandays: this.laborCost[0], manpower: this.laborCost[1], mancost: this.laborCost[2]});
    }
    if(this.foodcost){
        // console.log("foodcost value -->"+this.foodcost);
        this.tempoValueFood.push({ foodcost: this.foodcost });
    }
    console.log(" inputs --> "+JSON.stringify(this.tempoValueInput)+", labor --> "+JSON.stringify(this.tempoValueLabor)+", food --> "+JSON.stringify(this.tempoValueFood));
  }
  ngAfterViewChecked(){
    this.cdRef.detectChanges(); // error handler
  }
}
