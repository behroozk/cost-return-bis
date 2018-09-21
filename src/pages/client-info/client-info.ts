import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the ClientInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info',
  templateUrl: 'client-info.html',
})
export class ClientInfoPage {

  public client : FormGroup ;
  public location:any;
  private client_info:any = [];
  private dateTime:any;
  private _dateToday:any;

  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public viewCtrl : ViewController) {

    this.client = this.formBuilder.group({
      land: new FormControl(''),
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
    this.location = sessionStorage.getItem("ParaTechLocation");
    console.log("LOCATION :" +this.location);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ClientInfoPage');
  }
  clientForm(values){
    let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Saving client info..</div>
      </div>`
    });
    loading.present();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dateTime = new Date();
    this._dateToday =  months[this.dateTime.getMonth()] + '-' + this.dateTime.getDate() + '-' + this.dateTime.getFullYear();
    // console.log(values.name);
      // sessionStorage.setItem('cland',values.land);
      // sessionStorage.setItem('cname',values.name);
      // sessionStorage.setItem('cage',values.age);
      // sessionStorage.setItem('clocation',values.location);
      // this.client_info = [ values.land , values.name, values.age, values.location ];
      // var c_info = JSON.stringify(this.client_info)
      // sessionStorage.setItem('client_info', c_info);
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO client_details(client_land,client_age,client_location,client_name,user_date_created) VALUES("'+values.land+'","'+values.age+'","'+values.location+'","'+ values.name+'","'+this._dateToday+'")', {})
        .then(res => {
          console.log("client details saved");
          console.log("INSERT INTO client_details(client_land,client_age,client_location,client_name,user_date_created) VALUES('"+values.land+"','"+values.age+"','"+values.location+"','"+ values.name+"','"+this._dateToday+"')");
        }).catch(e => console.log(JSON.stringify(e)));
      }).catch(e => console.log(e.message));
    setTimeout(() => {
      loading.dismiss();
      this.viewCtrl.dismiss();
    }, 2000);
  }

}
