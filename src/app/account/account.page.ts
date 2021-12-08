import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userToken: any;
  first_name: any;
  last_name: any;
  userEmail: any;
  loading: any;

  constructor(
private auth:AuthenticationService,
private profile:ProfileService,
private loadingController:LoadingController

  ) {
this.auth.getToken().then(val=>{
  this.userToken = val.value;
  this.getProfileData();
})

   }

  ngOnInit() {
  }

  async getProfileData(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      // backdropDismiss: true,
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
   
    this.profile.getUserProfile(this.userToken).subscribe(val=>{
      this.first_name = val['first_name'];
      this.last_name = val['last_name'];
      this.userEmail  =  val['email'];
      this.loading.dismiss();
    })
  }

 

}
