import { Component } from '@angular/core';
import { NavController , LoadingController, ToastController, ModalController, PopoverController } from 'ionic-angular';

// import { ChooseVegetablePage } from '../choose-vegetable/choose-vegetable';
import { PopoverPage } from '../popover/popover';
import { WeekrecordsPage } from '../weekrecords/weekrecords';
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
    console.log("@homets.SHOWCROPPINGLIST --> client id : "+this.enteredClient);
    this.croppingInfo = [];
    this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // db.executeSql('SELECT * FROM client_details INNER JOIN cropping ON client_details.rowid = cropping.client_user_id INNER JOIN week ON cropping.croppping_id = week.cropping_id', {})
          db.executeSql('SELECT * FROM cropping INNER JOIN client_details ON cropping.client_user_id = client_details.rowid WHERE client_details.rowid = "'+this.enteredClient+'"', {})
        .then(res => {
          if(res.rows.length > 0){
            for(let rid=0; rid < res.rows.length; rid++){
              console.log("cropping_id : "+res.rows.item(rid).croppping_id+" client_user_id: " +res.rows.item(rid).client_user_id+" client_name: "+res.rows.item(rid).client_name+" cropping_created: "+res.rows.item(rid).user_date_created);
              this.croppingInfo.push({ cropping_id: res.rows.item(rid).croppping_id, client_user_id: res.rows.item(rid).client_user_id , client_name: res.rows.item(rid).client_name , cropping_created: res.rows.item(rid).user_date_created });
            }
          }
          else{
            console.log("nothing");
          }
        }).catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));
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
  viewWeekActivity(cropid,userid){
    this.dbServiceProvier.viewAllWeekActivity(cropid,userid);
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Preparing data...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.push(WeekrecordsPage);
    },2500);
  }
  cropInputActivity(croppingId,userId){
    this.dbServiceProvier.createWeekExpenses(userId,croppingId);
    console.log("creating week");
    let creatingWeek = this.loadingCtrl.create({
          content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
          Creating week expense..
        </div>
      </div>`,});
      creatingWeek.present();
    setTimeout(() => {
      sessionStorage.setItem('croppingId',croppingId);
      sessionStorage.setItem('userid',userId);
      var week_id = sessionStorage.getItem('week_id');
        console.log("@home.ts cropping id --> "+croppingId+" || userid --> "+userId+" || week_id -->"+week_id);
        this.navCtrl.push(CarrotsInputsLaborCostsPage);
        creatingWeek.dismiss();
    }, 2500);
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
