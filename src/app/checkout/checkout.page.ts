import { Component, OnInit } from '@angular/core';
// import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { CartService } from '../api/cart.service';
import { OrderService } from '../api/order.service';
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
  chechedshipping:any = true;
  constructor(
private cartService:CartService,
// private custom_model:ModalController,
private userAddress:ProfileService,
private auth:AuthenticationService,
private orderService:OrderService
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
  getUserdetails(userID){
    this.userAddress.getUserProfile(userID).subscribe(val=>{
          this.UserAddress = val;
          this.address = this.UserAddress.billing.address_1

    });
  }

OrderPlaceSuccess(){
//   let data = {
//     payment_method: "bacs",
//     payment_method_title: "Direct Bank Transfer",
//     set_paid: true,
//     billing: ,
//     shipping: ,
//     line_items: [
//       {
//         product_id: 93,
//         quantity: 2
//       },
//       {
//         product_id: 22,
//         variation_id: 23,
//         quantity: 1
//       }
//     ],
//     shipping_lines: [
//       {
//         method_id: "flat_rate",
//         method_title: "Flat Rate",
//         total: "10.00"
//       }
//     ]
//   }
//  this.orderService.createOrder(data).subscribe(val=>{

//  })

}

}
