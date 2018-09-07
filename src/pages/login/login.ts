import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, MenuController, LoadingController  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ChooseVegetablePage } from '../choose-vegetable/choose-vegetable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

userName='';
password='';
userPic='';
dateTime:any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public events: Events,
    public menuCtrl: MenuController,
  	private alertCtrl: AlertController,
    public sqlite: SQLite,
   	private loadingCtrl: LoadingController
    ) {
  }

  ionViewWillLoad(){
  	const loader = this.loadingCtrl.create({
  	  spinner: 'dots',
      content: "Loading App Data...",
      duration: 3000
    });
    loader.present();
    this.menuCtrl.swipeEnable( false );
  }

  login(){
  	if (this.userName=='' || this.password=='') {
  		// console.log user that username and password is required
  		let myalert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Please make sure to fill-in username and password!',
            buttons: ['Dismiss']
          });
  		myalert.present();
  	} else {
  		// check data base if username and password is correct
  		this.sqlite.create({
	    name: 'ionicdb.db',
	    location: 'default'
	    }).then((db: SQLiteObject) => {
	    db.executeSql('SELECT * FROM Paratechnicians WHERE uname="'+this.userName+'" AND pass="'+this.password+'";', {})
	      .then(res => {
	        if (res.rows.length==1) {
            sessionStorage.setItem("Observer" , "true");
	        	this.dateTime= new Date();
	        	console.log(this.dateTime);
			  	sessionStorage.setItem('username',this.userName);
    			this.events.publish('user:login', res.rows.item(0).rowid, res.rows.item(0).fname, res.rows.item(0).lname, res.rows.item(0).pic, res.rows.item(0).location, this.dateTime.toDateString() );
    			this.userName='';
  				this.password='';
  				this.userPic='';
    			let myalert = this.alertCtrl.create({
	                title: 'Success',
	                subTitle: 'You have succesfully logged-in',
	                buttons: ['Continue']
	              });
	              myalert.present();
    			this.menuCtrl.swipeEnable( true );
	        this.navCtrl.setRoot(ChooseVegetablePage);

	        } else {
	        	// console.log user of wrong username or password
	        	let myalert = this.alertCtrl.create({
	                title: 'Error!',
	                subTitle: 'UserName or Password was inncorrect!',
	                buttons: ['Dismiss']
	              });
	              myalert.present();
	        }
	      })
	      .catch(e => alert(e.message));

	    }).catch(e => alert(e.message));
  	}

  }

}
