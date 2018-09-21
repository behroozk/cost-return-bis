import { Component } from '@angular/core';
import { NavController , LoadingController, ToastController, ModalController, PopoverController } from 'ionic-angular';

// import { ChooseVegetablePage } from '../choose-vegetable/choose-vegetable';
import { PopoverPage } from '../popover/popover';
import { DatabaseServicesProvider } from '../../providers/database-services/database-services';
import { CarrotsInputsLaborCostsPage } from '../carrots-inputs-labor-costs/carrots-inputs-labor-costs';
import { ShowDataPage } from '../show-data/show-data';
import { ClientInfoPage } from '../client-info/client-info';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  client:any;
  public client_list:any=[];
  public holderArray:any=[];
  public userList:boolean = true;
  public croppingInfo:any=[];
  private enteredClient:any;
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
              private dbServiceProvier: DatabaseServicesProvider,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {

  }
  ionViewWillEnter(){
    this._vegetable = sessionStorage.getItem("vegetable");
    let intro = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Loading user lists..
        </div>
      </div>`,
        });

        intro.present();
        setTimeout(() => {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('SELECT * FROM client_details', {})
            .then(res => {
              if(res.rows.length > 0){
                for(let rid=0; rid < res.rows.length; rid++){
                  console.log(res.message);
                  console.log("Row ID :"+res.rows.item(rid).rowid+" name: "+res.rows.item(rid).client_name+" age: "+res.rows.item(rid).client_age+" location: " +res.rows.item(rid).client_location+" land: "+res.rows.item(rid).client_land+" user_created: "+res.rows.item(rid).user_date_created);
                  this.client_list.push({ client_id: res.rows.item(rid).rowid, name: res.rows.item(rid).client_name , age: res.rows.item(rid).client_age , location: res.rows.item(rid).client_location, land: res.rows.item(rid).client_land, user_created: res.rows.item(rid).user_date_created });
                }
              }
            }).catch(e => console.log(e.message));
          }).catch(e => console.log(e.message));
        intro.dismiss();
      }, 1000);
  }
  calculateCost(){

    var client_arrayInfo = sessionStorage.getItem('client_info');
    this.client = JSON.parse(client_arrayInfo);
    // this.saveClientInformation();
      this.navCtrl.push(CarrotsInputsLaborCostsPage);
    // this._sclient_age = sessionStorage.getItem('cage');
    // this._sclient_location = sessionStorage.getItem('clocation');
    // if(this._sclient_name == '' || this._sclient_age == '' || this._sclient_location == ''){
    //   this.showErrorToast();
    //   return false;
    // }
    // else{
    //
    //   this.saveClientInformation();
    //   this.navCtrl.push(CarrotsInputsLaborCostsPage);
    // }
  }
  showData(){
    this.navCtrl.push(ShowDataPage);
  }
  promptClientInfo(){
    let clientModal = this.modalCtrl.create(ClientInfoPage);
    clientModal.onDidDismiss(() => {
      this.client_list = [];
      this.ionViewWillEnter();
    });
    clientModal.present();
  }
  userClicked(client_id){
    this.userList = false;
    this.enteredClient = client_id;
    this.showCroppingList();
  }

  showCroppingList(){
    this.croppingInfo = [];
    this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // db.executeSql('SELECT * FROM client_details INNER JOIN cropping ON client_details.rowid = cropping.client_user_id INNER JOIN week ON cropping.croppping_id = week.cropping_id', {})
          db.executeSql('SELECT * FROM cropping INNER JOIN client_details ON cropping.client_user_id = client_details.rowid', {})
        .then(res => {
          if(res.rows.length > 0){
            for(let rid=0; rid < res.rows.length; rid++){
              console.log("cropping_id : "+res.rows.item(rid).croppping_id+" week_id : "+res.rows.item(rid).week_id+" client_user_id: " +res.rows.item(rid).client_user_id+" client_name: "+res.rows.item(rid).client_name+" cropping_created: "+res.rows.item(rid).user_date_created);
              this.croppingInfo.push({ cropping_id: res.rows.item(rid).croppping_id, week_id: res.rows.item(rid).week_id, client_user_id: res.rows.item(rid).client_user_id , client_name: res.rows.item(rid).client_name , cropping_created: res.rows.item(rid).user_date_created });
            }
          }
        }).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
  }
  viewDatabase(cropping_id,user_id,week_id){
    this.dbServiceProvier.showConnectedData(user_id,cropping_id,week_id);
  }
  addNewCroppingCycle(){
    console.log("client : "+this.enteredClient)
    // let popover = this.popoverCtrl.create(PopoverPage);
    // popover.present({
    //   ev: myEvent
    // });
    sessionStorage.setItem('client_id', this.enteredClient);
    let saveCroppingCylce = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Creating new crop cycle..
        </div>
      </div>`,
        });
    saveCroppingCylce.present();
    setTimeout(() => {
        this.dbServiceProvier.addNewCroppingCycle(this.enteredClient);
        this.showCroppingList();
        saveCroppingCylce.dismiss();
      }, 5000);
  }
  // saveClientInformation(){
  //   // this.dbServiceProvier.showAllUser();
  // //
  // // console.log(this.client[1]+'","'+this.client[2]+'","'+this.client[3]+'","'+this.client[0]+'","'+this._dateToday);
  // //   db.executeSql('INSERT INTO client_details(client_land,client_age,client_location,client_name,user_date_created) VALUES("'+this.client[0]+'","'+this.client[2]+'","'+this.client[3]+'","'+this.client[1]+'","'+this._dateToday+'")', {})
  // //   .then(res => {
  // //     console.log("client details saved");
  // //   }).catch(e => console.log(JSON.stringify(e)));
  //
  // }
  cropInputActivity(croppingId,userId){
    sessionStorage.setItem('croppingId',croppingId);
    sessionStorage.setItem('userid',userId);
    this.navCtrl.push(CarrotsInputsLaborCostsPage);
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
