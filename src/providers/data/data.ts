// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  total_price='';
  total_cost=0;
  total_gain=0;
  roi=0;
  returnMoney=0;
  percentage=0;
  constructor() {
    console.log('Hello DataProvider Provider');
  }
  priceValue(price){
    // console.log(price);
    this.total_price = price.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    return this.total_price;
  }
  costCalculator(inputCost,laborCost,adminCost){
    // console.log("Input cost : " +inputCost+ " Labor Costs : " +laborCost+ " Admin Cost: " +adminCost);
    this.total_cost = parseInt(inputCost) + parseInt(laborCost) + parseInt(adminCost);
    // console.log("Cost total : " +this.total_cost);
    return this.total_cost;
  }
  gainCalculator(pricePerKilo,numberKiloHarvested){
    // console.log("Price per kilo : " +pricePerKilo+ " Number of kilo harvested : " +numberKiloHarvested);
    this.total_gain = pricePerKilo * numberKiloHarvested;
    // console.log("Gain total : " +this.total_gain);
    return this.total_gain;
  }
  returnOfInvestmentValue(cost,gain){
    // console.log("Gain : " +gain+ " Cost : " +cost);
    this.roi = (gain-cost)/cost;
    // console.log("Roi : " +this.roi);
    return this.roi;
  }
  moneyReturn(percentage,cost){
    this.returnMoney = percentage * cost;
    // console.log("Return money : " +this.returnMoney);
    return this.returnMoney;
  }
  numToPercentage(num){
    this.percentage = Math.round(num*100);
    return this.percentage;
  }
}
export class ArrayStorage{
  // public _storeArray1: storeArray1;
  // public _storeArray2: storeArray2;
  // public _storeArray3: storeArray3;
  public _storeArray1='';
  public _storeArray2='';
  public _storeArray3='';
  public _storeArray4='';
  public _storeArray5='';
  public _storeArray6='';
  public _storeArray7='';

  setArray_1(_storeArray1){
    this._storeArray1 = _storeArray1;
    console.log("array " +this._storeArray1);
  }

  setArray_2(_storeArray2){
    // console.log("Array number of manpower stored");
    this._storeArray2 = _storeArray2;
  }

  setArray_3(_storeArray3){
    // console.log("Array number of days stored");
    this._storeArray3 = _storeArray3;
  }

  setArray_4(_storeArray4){
    // console.log("Array total inputs and admin stored");
    this._storeArray4 = _storeArray4;
  }

  setArray_5(_storeArray5){
    // console.log("Labor subtotal costs stored");
    this._storeArray5 = _storeArray5;
  }

  setArray_6(_storeArray6){
    // console.log("Admin costs stored");
    this._storeArray6 = _storeArray6;
  }

  setArray_7(_storeArray7){
    // console.log("Labor cost/day stored");
    this._storeArray7 = _storeArray7;
  }
}
