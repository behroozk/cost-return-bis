// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the VegetableCostListsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VegetableCostListsProvider {

  carrotsLaborList:any = [];
  inputLists:any = [];
  adminCostLists:any = [];

  constructor() {

  }
  carrotsLaborListProvider(){
    return this.carrotsLaborList = [
      { id: 0, labor: 'Clearing' },
      { id: 1, labor: 'Plowing' },
      { id: 2, labor: 'Harrowing' },
      { id: 3, labor: 'Pulverizing' },
      { id: 4, labor: 'Plotting' },
      { id: 5, labor: 'Sowing' },
      { id: 6, labor: 'Weeding + Thinning' },
      { id: 7, labor: 'Spraying' },
      { id: 8, labor: 'Fertilization' },
      { id: 9, labor: 'Weeding' },
      { id: 10, labor: 'Harvesting' },
      { id: 11, labor: 'Hauling' }
    ];
  }
  carrotsInputListProvider(){
    return this.inputLists = [
      { id: 0, input: 'Seeds' },
      { id: 1, input: 'Fertilizer' },
      { id: 2, input: 'Chemicals (Insecticide,Pesticide,Fungicide)'}
    ];
  }
  carrotsAdminListProvider(){
    return this.adminCostLists = [
      { id: 0, admin: 'Land Rental'},
      { id: 1, admin: 'Bodega'},
      { id: 2, admin: 'Tractor'},
      { id: 3, admin: 'Animals'},
      { id: 4, admin: 'Transportation'},
      { id: 5, admin: 'Packing Materials'},
      { id: 6, admin: 'Overhead and Contigency'}
    ];
  }
}
