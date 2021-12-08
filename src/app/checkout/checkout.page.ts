import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { CartService } from '../api/cart.service';
import { ProfileService } from '../api/profile.service';
// import { ShippingAddressPage } from '../shipping-address/shipping-address.page';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  pro_data: any;
  pro_length: any;
  total_po_price: any;
  userId: string;
   UserAddress:any;
  address: any;
  final_shipping_address:any;
  chechedshipping:any = true;
  loading: HTMLIonLoadingElement;
  // shipping_addr: any;
  // billing_addr:any;
  constructor(
private cartService:CartService,
// private custom_model:ModalController,
private userAddress:ProfileService,
private auth:AuthenticationService,
private router:Router,
private loadingController:LoadingController

  ) { 
    this.getCartData()
    this.auth.getToken().then(val=>{
      this.userId = val['value'];
      this.getUserdetails(this.userId);
    });
   
  }

  ngOnInit() {
    
 
  }
  getCartData() {
    this.total_po_price = 0;
    this.cartService.getCartStorage().then(val => {
      this.pro_data = val;
      console.log(val)
      if (this.pro_data != null) {
        this.pro_length = this.pro_data.length;
        this.pro_data.forEach(element => {
          this.total_po_price = (parseFloat(this.total_po_price) + parseFloat(element.total_price)).toFixed(2);

        });
      }

    })
  }
  async getUserdetails(userID){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner:'bubbles',
      animated:true,
      // backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.userAddress.getUserProfile(userID).subscribe(val=>{
          this.UserAddress = val;
          this.address = this.UserAddress.billing.address_1
 this.loading.dismiss();
    });
  }
  // async presentModal() {
  //   const modal = await this.custom_model.create({
  //     component: ShippingAddressPage,
  //     cssClass: 'my-custom-class',
  //   });
  //   await modal.present();
  //   modal.onDidDismiss().then((data) => {
  //     // do something with the data ... 
  //     return
  //   });
  // }

  shippingAddressMethod(e){
    if(!e.target.checked){
      this.chechedshipping = e.target.checked;
      this.router.navigateByUrl("/shipping-address")
      // this.presentModal();
    }
  }
  OrderPlaceSuccess(){
    if(this.UserAddress != undefined){
       if(this.chechedshipping){
      this.final_shipping_address = this.UserAddress.billing;
    } else{
      this.final_shipping_address = this.UserAddress.shipping;
    }
    
    let navigationExtras: NavigationExtras =  {
      state: {
        billing_address:this.UserAddress.billing,
        shipping_address:this.final_shipping_address,
      }
    }
    this.router.navigate(['/paymentmethod'],navigationExtras)

    }
   
  }
 

}
