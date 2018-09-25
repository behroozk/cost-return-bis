// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InputCostCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputCostCalculatorProvider {
  labor_cost:any;
  inputValue:number=0;
  adminValueFixed:number=0;
  adminValueUnit: number=0;
  _subtotalLabor:number=0;
  _unitVariableCost:number=0;
  breakEvenPrice:number=0;
  foodcost: number =0;
  constructor() {
    console.log('Hello InputCostCalculatorProvider Provider');
  }
  emptyValues(){
    console.log("empty values");
    this.labor_cost=0;
    this.inputValue=0;
    this._subtotalLabor=0;
    this.adminValueUnit=0;
    this.foodcost=0;
  }
  costPerLabor(mandays,mancost,manpower){ // cost per labor
    this.labor_cost = (mancost*manpower)*mandays;
    return this.labor_cost;
  }
  addingCost(inputValues){ // input cost
      this.inputValue += parseInt(inputValues);
      return this.inputValue;
  }
  addingFoodCost(inputCost){
    this.foodcost += parseInt(inputCost);
    return this.foodcost;
  }
  adminfixedCost(input){
    this.adminValueFixed += parseInt(input);
    return this.adminValueFixed;
  }
  adminunitCost(_input){
    this.adminValueUnit += parseInt(_input);
    return this.adminValueUnit;
  }
  subTotalLabor(_costPerLabor){
    this._subtotalLabor += _costPerLabor;
    return this._subtotalLabor;
  }
  unitVariableCost(input,labor,admin,totalUnitOfProduction){
    this._unitVariableCost = (input+labor+admin)/totalUnitOfProduction;
    return this._unitVariableCost;
  }
  breakEven(fixedCost,unitVarCost,totalProd){
    return this.breakEvenPrice = (fixedCost/totalProd)+unitVarCost;
  }
  isEmpty(obj) {

      // null and undefined are "empty"
      if (obj == null) return true;

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;

      // If it isn't an object at this point
      // it is empty, but it can't be anything *but* empty
      // Is it empty?  Depends on your application.
      if (typeof obj !== "object") return true;

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
          if (obj.hasOwnProperty.call(obj, key)) return false;
      }

      return true;
  }
}
