import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  userData: any;
  first_name: any;
  last_name: any;
  // shipp_mob:any;
  shipp_address: any;
  // shipp_email:any;
  shipp_pin: any;
  shipp_city: any;
  shipp_state: any;
  shipp_code: any;
  shipp_country: any;
  userToken: any;
  ionicForm: FormGroup;
  loading: any;
  constructor(
    // private custom_model: ModalController,
    private userProfile: ProfileService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private router:Router
  ) {
    this.authToken();
    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      country: [''],
      city: [''],
      state: [''],
      postcode: ['']
    })


  }
  authToken() {
    this.auth.getToken().then(val => {
      this.userToken = val['value'];
      this.getAddressData(this.userToken); 
    })
  }
  async getAddressData(id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.userProfile.getUserProfile(id).subscribe(val => {
      this.userData = val;
      console.log(this.userData)
      this.first_name = this.userData.shipping.first_name;

      this.last_name = this.userData.shipping.last_name;

      this.shipp_address = this.userData.shipping.address_1;

      this.shipp_city = this.userData.shipping.city;

      // this.shipp_email = this.userData.shipping.email;

      this.shipp_code = this.userData.shipping.postcode;

      // this.shipp_mob = this.userData.shipping.phone;

      this.shipp_state = this.userData.shipping.state;

      this.shipp_country = this.userData.shipping.country;

      this.loading.dismiss();

    })
  }
  ngOnInit() {

  }
  getShippingDetails(){
    

    // this.custom_model.dismiss(this.ionicForm.value);

    let data = {
      shipping: this.ionicForm.value,

    }

    this.userProfile.updateProfile(this.userToken, data).subscribe(val => {
      console.log(val)
      this.router.navigateByUrl("/checkout")
      // if (val['status'] == 'success') {
      //   this.presentToast(val['errormsg']);
      // }
    })
    // console.log(this.ionicForm.value)
  }

  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.custom_model.dismiss({
  //     'dismissed': true
  //   });
  // }

}
