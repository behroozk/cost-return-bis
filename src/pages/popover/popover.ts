import { Component } from '@angular/core';
import { IonicPage, App, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { DatabaseServicesProvider } from '../../providers/database-services/database-services';



import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
  client_id:any;
  // private vegetable:any;
  constructor(
    public app : App, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private sqlite: SQLite,
    private dbServiceProvier: DatabaseServicesProvider,
    private viewCtrl: ViewController) {
  this.client_id = sessionStorage.getItem('client_id');
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
    console.log("client id : " +this.client_id);
    // this.dbServiceProvier.addNewCroppingCycle(this.client_id);
    this.sqlite.create({
      name: 'ionic.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    // var storage = new SQLite();
    // storage.create({ name: "ionic.db", location: 'default'}).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO cropping(client_user_id) VALUES("'+this.client_id+'")', {})
      .then(res => {
        console.log("cropping added");
        return true;
      },(error) => {
          console.info("Unable to execute sql " + JSON.stringify(error));
      })
    },(err) => {
           console.info("Error opening database: " + err);
    });
    console.log('ionViewDidLoad PopoverPage');
  }
  backMainMenu(){
    this.viewCtrl.dismiss();
    this.app.getRootNav().popToRoot();
  }
}
