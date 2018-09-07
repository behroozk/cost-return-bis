import { Component } from '@angular/core';
import { NavController , LoadingController, ToastController, ModalController } from 'ionic-angular';

// import { ChooseVegetablePage } from '../choose-vegetable/choose-vegetable';
import { CarrotsInputsLaborCostsPage } from '../carrots-inputs-labor-costs/carrots-inputs-labor-costs';
import { ShowDataPage } from '../show-data/show-data';
import { ClientInfoPage } from '../client-info/client-info';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  _sclient_name:any;
  _sclient_age:any;
  _sclient_location:any;
  dateTime:any;
  _dateToday:any;
  _vegetable:any;
  constructor(public navCtrl: NavController,
              private loadingCtrl : LoadingController,
              private toastCtrl : ToastController,
              private sqlite: SQLite,
              public modalCtrl: ModalController) {

  }
  ionViewWillEnter(){
    this._vegetable = sessionStorage.getItem("vegetable");
    let intro = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Please wait..
        </div>
      </div>`,
        });

        intro.present();
        setTimeout(() => {
            intro.dismiss();
      }, 1000);
  }
  calculateCost(){
    this._sclient_name = sessionStorage.getItem('cname');
    this._sclient_age = sessionStorage.getItem('cage');
    this._sclient_location = sessionStorage.getItem('clocation');
    if(this._sclient_name == '' || this._sclient_age == '' || this._sclient_location == ''){
      this.showErrorToast();
      return false;
    }
    else{

      this.saveClientInformation();
      this.navCtrl.push(CarrotsInputsLaborCostsPage);
    }
  }
  showData(){
    this.navCtrl.push(ShowDataPage);
  }
  promptClientInfo(){
    let clientModal = this.modalCtrl.create(ClientInfoPage);
    clientModal.present();
  }
  saveClientInformation(){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  this.dateTime = new Date();
  this._dateToday =  months[this.dateTime.getMonth()] + '-' + this.dateTime.getDate() + '-' + this.dateTime.getFullYear();
  console.log("time : " +this._dateToday);
  console.log("location : " +this._sclient_location);
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO client_details(client_name,client_age,client_location,date_recorded) VALUES("'+this._sclient_name+'","'+this._sclient_age+'","'+this._sclient_location+'","'+this._dateToday+'")', {})
    .then(res => {
      console.log("client details saved");
    }).catch(e => console.log(e.message));
    db.executeSql('SELECT * FROM client_details ORDER BY rowid DESC LIMIT 1', {})
    .then(res => {
      console.log(res.message);
      console.log("Row ID :"+res.rows.item(0).rowid);
      sessionStorage.setItem('client_id',res.rows.item(0).rowid);
    }).catch(e => console.log(e.message));
  }).catch(e => console.log(e.message));
  }
  showErrorToast(){
  let toast = this.toastCtrl.create({
    message: 'Palihug og butang sa impormasyon sa mugamit',
    duration: 3000,
    position: 'middle'
    });

  toast.onDidDismiss(() => {
  console.log('Dismissed toast');
  });

  toast.present();
  }
}
