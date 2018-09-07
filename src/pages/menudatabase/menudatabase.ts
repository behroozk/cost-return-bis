import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

/**
 * Generated class for the MenudatabasePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menudatabase',
  templateUrl: 'menudatabase.html'
})
export class MenudatabasePage {

  tabCostRoot = 'TabCostPage'
  tabReturnRoot = 'TabReturnPage'


  constructor(public navCtrl: NavController) {}


}
