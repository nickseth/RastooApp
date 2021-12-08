import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.page.html',
  styleUrls: ['./billing-address.page.scss'],
})
export class BillingAddressPage implements OnInit {
  userData: any;
  first_name:any;
  last_name:any;
  shipp_mob:any;
  shipp_address:any;
  shipp_email:any;
  shipp_pin:any;
  shipp_city:any;
  shipp_state:any;
    shipp_code: any;
    shipp_country: any;
    userToken:any;
    ionicForm: FormGroup;
    loading: any;
  constructor(
    private custom_model:ModalController,
    private userProfile:ProfileService,
    private auth:AuthenticationService,
    private formBuilder: FormBuilder,
    public loadingController:LoadingController

  ) { 
    this.authToken();

    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
      email: [''],
      address_1: [''],
      country: [''],
      city: [''],
      state: [''],
      postcode:['']
   })


  }
  authToken(){
    this.auth.getToken().then(val=>{
     this.userToken = val['value'];
      this.getAddressData(this.userToken); 
    })
  }
async getAddressData(id){
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    spinner:'bubbles',
    animated:true,
    backdropDismiss: true,
    translucent: true,
  });
  await this.loading.present();
  this.userProfile.getUserProfile(id).subscribe(val=>{
    this.userData = val;
  console.log( this.userData)
      this.first_name = this.userData.billing.first_name;

      this.last_name = this.userData.billing.last_name;

  this.shipp_address = this.userData.billing.address_1;

    this.shipp_city = this.userData.billing.city;

  this.shipp_email = this.userData.billing.email;

      this.shipp_code = this.userData.billing.postcode;

      this.shipp_mob = this.userData.billing.phone;

    this.shipp_state = this.userData.billing.state;

    this.shipp_country = this.userData.billing.country;

    this.loading.dismiss();
 
  })
}
  ngOnInit() {

  }
  getShippingDetails(){

    let data = {
      billing: this.ionicForm.value,
      
    }
    
    this.userProfile.updateProfile(this.userToken,data).subscribe(val => {
      console.log(val)
      // if (val['status'] == 'success') {
      //   this.presentToast(val['errormsg']);
      // }
    })
    // console.log(this.ionicForm.value)
  }
 
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.custom_model.dismiss({
      'dismissed': true
    });
  }


}
