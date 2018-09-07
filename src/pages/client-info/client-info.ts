import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public viewCtrl : ViewController) {
    this.client = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
    this.location = sessionStorage.getItem("ParaTechLocation");
    console.log("LOCATION :" +this.location);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientInfoPage');
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
    console.log(values.name);
      sessionStorage.setItem('cname',values.name);
      sessionStorage.setItem('cage',values.age);
      sessionStorage.setItem('clocation',values.location);



    setTimeout(() => {
      loading.dismiss();
      this.viewCtrl.dismiss();
    }, 2000);
  }

}
