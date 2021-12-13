import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  loading: any;
  first_name: any;
  last_name: any;
  userEmail: any;
  userToken: any;
  ionicForm: any;
  toast: Promise<HTMLIonToastElement>;
  userData: Object;

  constructor(
    private loadingController: LoadingController,
    private profile: ProfileService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.auth.getToken().then(val => {
      this.userToken = val;
      this.getProfileData();
    });
    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],

    })
  }

  ngOnInit() {
//     this.http.get(`https://rastoo.com/wp-json/wc/v3/customers/32?consumer_key=${Consumer_key}&consumer_secret=${Consumer_secret}`,
//   // data,
//   // {headers:header}
// ).subscribe(customerData => {
//   console.log(customerData);
// });
  }
  async getProfileData() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
    // let data = { token: this.userToken }
    this.profile.getUserProfile(this.userToken).subscribe(val => {
      console.log(val)
      this.userData = val;
      this.first_name = val['first_name'];
      this.last_name = val['last_name'];
      this.userEmail = val['email'];
      // this.first_name = this.userData.shipping.first_name;
      // this.last_name = this.userData.shipping.last_name;
      // this.shipp_address = this.userData.shipping.address_1;
      // this.shipp_city = this.userData.shipping.city;
      // this.shipp_email = this.userData.shipping.email;
      // this.shipp_code = this.userData.shipping.postcode;
      // this.shipp_mob = this.userData.shipping.phone;
      // this.shipp_state = this.userData.shipping.state;
      // this.shipp_country = this.userData.shipping.country;
      this.loading.dismiss();
    })
  }
  async submitForm() {

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
    let data = {
      first_name: this.ionicForm.value.first_name,
      last_name: this.ionicForm.value.last_name,
      email: this.ionicForm.value.email
    }
    
    this.profile.updateProfile(this.userToken,data).subscribe(async val => {
      await this.loading.dismiss();
      console.log(val)
      this.presentToast('Profile Successfully update');
    })
  }

  presentToast(mss) {
    this.toastCtrl.create({
      message: mss,
      duration: 3000,
      position: 'bottom'
    }).then((obj) => {
      obj.present();
    });

  }

}
