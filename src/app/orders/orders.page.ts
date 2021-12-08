import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../api/authentication.service';
import { OrderService } from '../api/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  userToken: any;

  constructor(
private orderService:OrderService,
private authToken:AuthenticationService

  ) {
   

   }

  ngOnInit() {
    this.authToken.getToken().then(val => {
      this.userToken = val.value;
      this.getOrderData(this.userToken);
    });
  }
  async getOrderData(id){
    await this.orderService.getToOrderLoc().then(item=>{
     if(item != null){
      item.forEach(element => {
        this.orderService.retrieveOrder(element.id).subscribe(val=>{
          console.log(val)
        })
         });
     }
  
    })
  
  }

}
