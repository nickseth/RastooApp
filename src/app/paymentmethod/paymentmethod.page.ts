import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../api/authentication.service';
import { CartService } from '../api/cart.service';
import { OrderService } from '../api/order.service';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.page.html',
  styleUrls: ['./paymentmethod.page.scss'],
})
export class PaymentmethodPage implements OnInit {
 
  billing_address: any;
  shipping_address: any;
  total_po_price: any;
  pro_data: any;
  pro_length: any;
  payment_method:any = null;
  line_items:any;
  userToken: string;
  order_local: any;
  displayModel:any = 'none';
  payed_btn:any;
  btn_pad_color:any = true;
  loading: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService:CartService,
    private orderService:OrderService,
    private authToken:AuthenticationService,
    private stripe: Stripe,
    private loadingController:LoadingController
  ) { 

    this.stripe.setPublishableKey('pk_test_51K51rFSIIqLP1uOsv712JHcY2oDs4YsdJeRSUuTvOdpmJQLgivTJovYTdl9zG4HExMGMjcV045W9yUfVVoX3ifyv00Pylkt7Ao');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.billing_address = this.router.getCurrentNavigation().extras.state.billing_address;
        this.shipping_address = this.router.getCurrentNavigation().extras.state.shipping_address;
   
      }
    });
    this.getCartData();

  }

  ngOnInit() {
  }

  getCartData() {
    this.line_items = [];
    this.total_po_price = 0;
    this.cartService.getCartStorage().then(val => {
      this.pro_data = val;
      // console.log(this.pro_data)
      if (this.pro_data != null) {
        this.pro_length = this.pro_data.length;
        this.pro_data.forEach(element => {
          this.total_po_price = (parseFloat(this.total_po_price) + parseFloat(element.total_price)).toFixed(2);
          this.payed_btn = this.total_po_price; 
        });
      }

      this.pro_data.forEach(element => {
        
        if(element.variation_id){
          let data = {};
        data['product_id'] = element.product_id;
        data['quantity'] = element.quantity;
        data['variation_id'] = element.variation_id;
        this.line_items.push(data);
        } else{
          let data = {};
          data['product_id'] = element.product_id;
          data['quantity'] = element.quantity;
          this.line_items.push(data);

        }
      });

    })

    // console.log(this.line_items)
  }

  radioGroupChange(e){
 this.payment_method = e.target.value;
 if(this.payment_method == "online"){
   this.displayModel = 'block';
  this.btn_pad_color = true;
  // this.payment_method();
  // this.payStripePayment();
 } else{
  this.displayModel = 'none';
  this.btn_pad_color = false;
 }
 this.authToken.getToken().then(val => {
  this.userToken = val.value;

});
  }

 async OrderPlaceSuccess(line_items){
  this.btn_pad_color = false;
  // this.order_local =  await this.orderService.getToOrderLoc();

  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    spinner: 'bubbles',
    animated: true,
    backdropDismiss: true,
    translucent: true,
  });
  await this.loading.present();
if(this.payment_method != null){
  // console.log(this.userToken)
  let data = {
    customer_id:this.userToken,
    payment_method:this.payment_method,
    payment_method_title:this.payment_method=='offline'?"Cash on Delivery":"stripe gateway",
    set_paid:this.payment_method=='offline'?false:true,
    billing:this.billing_address,
    shipping:this.shipping_address,
    line_items:line_items
  }
this.orderService.createOrder(data).subscribe(async val=>{
  await this.loading.dismiss();
  console.log(val)
  this.cartService.clearCartStorage();
  let navigationExtras: NavigationExtras =  {
        state: {
          Order_Success_place:val,
         
        }
      }
  this.router.navigate(['/success-order'],navigationExtras);
  
  // if(this.order_local == null){
  //   this.order_local = []
  // }
  // this.order_local.push({id:val['id']})
  // if(this.orderService.addToOrderLoc(this.order_local)){
  //   this.cartService.clearCartStorage();

  //   let navigationExtras: NavigationExtras =  {
  //     state: {
  //       Order_Success_place:val,
       
  //     }
  //   }
  //   this.router.navigate(['/success-order'],navigationExtras)
  // //  this.router.navigateByUrl("/success-order");
  // }

})
}
  }
payStripePayment(){
  this.btn_pad_color = false;
  // this.payed_btn = "Pad";
  this.displayModel = 'none';
  let card = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2024,
    cvc: '220'
   }
  
   this.stripe.createCardToken(card)
   .then(token => console.log(token))
   .catch(error => console.error(error));
}


// payNow(){
//   this.stripe.({
//     amount: 100,
//     currency: "USD",
//     source: "tok_1K54zaSIIqLP1uOsuOy2KpTn",
//     description: 'My First Test Charge (created for API docs)',
//       })
// }
  

}
