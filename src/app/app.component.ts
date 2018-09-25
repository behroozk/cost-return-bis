import { Component, ViewChild } from '@angular/core';
import { Platform, Events, AlertController, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { MenudatabasePage } from '../pages/menudatabase/menudatabase';
import { HomePage } from '../pages/home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { ChooseVegetablePage } from '../pages/choose-vegetable/choose-vegetable';
// import { CarrotsInputsLaborCostsPage } from '../pages/carrots-inputs-labor-costs/carrots-inputs-labor-costs';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage ;
  rowid:any;
  fName:any;
  lName:any;
  userPic:any;
  location:any;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private sqlite: SQLite,
    private alertCtrl: AlertController,
    public events: Events,
    public menuCtrl: MenuController) {
    platform.ready().then(() => {
    var user = sessionStorage.getItem("Observer");
    console.log("user" +user);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    // alert('i wuz here');
    db.executeSql('CREATE TABLE IF NOT EXISTS Paratechnicians(rowid INTEGER PRIMARY KEY, uname TEXT UNIQUE, fname TEXT, lname TEXT, pass TEXT, pic TEXT, location TEXT)', {})
      .then(res =>{
        db.executeSql('SELECT * FROM `Paratechnicians`', {})
        .then(res =>{
          console.log(res.rows.length);
          // alert('res.rows.length'+res.rows.length);
           if (res.rows.length<=0) {
            db.executeSql("INSERT INTO `Paratechnicians` (`uname`, `fname`, `lname`, `pass`, `pic`, `location`) VALUES"+
            " ('laxson', 'FELIX', 'NACALABAN', '123QWE', 'felix.jpg', 'Lirongan'),"+
            " ('pabs', 'PABLENCIO', 'LUCAS', '123QWE', 'pablencio.jpg', 'Lirongan'),"+
            " ('neneng', 'MARIBEL', 'DAUGAN', '123QWE', 'maribel.jpg', 'Miarayon'),"+
            " ('pipin', 'PENWIL', 'LIRA', '123QWE', 'penwil.jpg', 'Lirongan'),"+
            " ('ryan', 'RYAN', 'DANTO', '123QWE', 'ryan.jpg', 'Miarayon'),"+
            " ('rits', 'RITA', 'MEMPER', '123QWE', 'rita.jpg', 'Miarayon'),"+
            " ('jong', 'JOBERT', 'LAYOCAN', '123QWE', 'jobert.jpg', 'Lirongan'),"+
            " ('dondon', 'MANUEL', 'SABURNIDO', '123QWE', 'manuel.jpg', 'Miarayon'),"+
            " ('joy', 'MARYJOY', 'ASILAN', '123QWE', 'maryjoy.jpg', 'Miarayon');"  , {})
            .then(res => {
              console.log('Data Inserted to Table!');
            }).catch(e => alert('para'+e.message));
          }
        }).catch(e => alert('3RD SQL:'+e.message));
        // db.executeSql('CREATE TABLE IF NOT EXISTS client_details(rowid INTEGER PRIMARY KEY, client_name TEXT, client_age TEXT, client_location TEXT, date_recorded TEXT)',{})
        // .then(res => console.log('Executed client details'));
        }).catch(e => console.log(e.message));
        db.executeSql('CREATE TABLE IF NOT EXISTS can_prices(rowid INTEGER PRIMARY KEY, vegetable TEXT, brand_name TEXT, price INTEGER)',{})
          .then(res =>{
              db.executeSql('SELECT * FROM `can_prices`', {})
              .then(res=>{
                if(res.rows.length <=0) {
                  db.executeSql("INSERT INTO can_prices (vegetable,brand_name,price) VALUES('carrots','Takiis','1200')", {})
                  .then(res =>{
                    console.log("Executed can prices");
                  }).catch(e => alert("can message "+e.message));
                }
              }).catch(e => alert("can message "+e.message));
          }).catch(e => alert("can message "+e.message));
      }).catch(e => console.log('2ND SQL:'+e.message));
      statusBar.styleDefault();
      splashScreen.hide();
    });
     this.listenToLoginEvents();
  }

  listenToLoginEvents(){
        this.events.subscribe('user:login', (rowid,fname,lname,pic,location,time) => {
          // console.log('Welcome ', user, ' at ', time, ' with', pic);
          this.rowid=rowid;
          this.fName=fname;
          this.lName=lname;
          this.userPic=pic;
          this.location=location;
          sessionStorage.setItem("ParaTechLocation" ,this.location);
        });
  }

  logout(){
    let alert = this.alertCtrl.create({
    title: 'Confirm signout',
    message: 'Do you want to leave?',
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Confirm',
        handler: () => {
          sessionStorage.setItem("Observer" , "false");
          this.menuCtrl.close();
          this.nav.setRoot(LoginPage);
        }
      }
    ]
  });
alert.present();
  }

  changePassword(){
  let alert = this.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'currentPassword',
        placeholder: 'Current Passwrod',
        type: 'password'
      },
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          if (data.currentPassword!='' && data.newPassword!='') {
            this.sqlite.create({
              name: 'fertilizer.db',
              location: 'default'
              }).then((db: SQLiteObject) => {
              db.executeSql('SELECT * FROM Paratechnicians WHERE rowid='+this.rowid+'', {})
                .then(res => {
                  if (data.currentPassword==res.rows.item(0).pass) {
                    db.executeSql('UPDATE `Paratechnicians` SET `pass`="'+data.newPassword+'" WHERE rowid='+this.rowid+'', {})
                    .then(res => {
                      let alert = this.alertCtrl.create({
                        title: 'Success!',
                        subTitle: 'You have succesfully changed your password. Please remember you new password.',
                        buttons: ['Dismiss']
                      });
                      alert.present();
                    })
                    .catch(e => console.log(e.message));
                  } else {
                    let alert = this.alertCtrl.create({
                      title: 'Incorrect Password!',
                      subTitle: 'Your current password input does not match to your password in database',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                  }
                })
                .catch(e => console.log(e.message));

              }).catch(e => console.log(e.message));
          } else {
            let alert = this.alertCtrl.create({
              title: 'Input Needed!',
              subTitle: 'Please don\'t leave the input fields blank.',
              buttons: ['Dismiss']
            });
            alert.present();
            return false;
          }
        }
      }
    ]
  });
  alert.present();
  }
}
