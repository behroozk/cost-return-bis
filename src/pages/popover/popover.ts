import { Component } from '@angular/core';
import { IonicPage, App, NavParams, LoadingController, ViewController } from 'ionic-angular';

// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CostEditPage } from '../cost-edit/cost-edit';
/**
 * Generated class for the PopoverPage page.
 *, private sqlite: SQLite
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  // costID:string;
  // data:string;
  // private vegetable:any;
  constructor(public app : App, public navParams: NavParams, public loadingCtrl: LoadingController, private viewCtrl: ViewController) {
  }
  openEdit(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        loading.dismiss();
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(CostEditPage);
      }, 5000);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  backMainMenu(){
    this.viewCtrl.dismiss();
    this.app.getRootNav().popToRoot();
  }
}
