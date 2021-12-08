import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../api/authentication.service';
import { CartService } from '../api/cart.service';
import { OrderService } from '../api/order.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService:CartService,
    private orderService:OrderService,
    private authToken:AuthenticationService,
    
  ) { 

  
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.billing_address = this.router.getCurrentNavigation().extras.state.billing_address;
        this.shipping_address = this.router.getCurrentNavigation().extras.state.shipping_address;
        console.log( this.billing_address)
        console.log(this.shipping_address)
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
 this.authToken.getToken().then(val => {
  this.userToken = val.value;

});
  }

 async OrderPlaceSuccess(line_items){
  
  this.order_local =  await this.orderService.getToOrderLoc();
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
this.orderService.createOrder(data).subscribe(val=>{
  console.log(val)
  if(this.order_local == null){
    this.order_local = []
  }
  this.order_local.push({id:val['id']})
  if(this.orderService.addToOrderLoc(this.order_local)){
    this.cartService.clearCartStorage();
   this.router.navigateByUrl("/success-order");
  }

})
}
  }

}
