import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { OrderService } from '../api/order.service';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  userToken: any;
   orders_product_data:any;
  loading: any;
  constructor(
private orderService:OrderService,
private authToken:AuthenticationService,
private productService:ProductsService,
public loadingController:LoadingController,
public router:Router
  ) {
   

   }

  ngOnInit() {
    this.authToken.getToken().then(val => {
      this.userToken = val.value;
      this.getOrderData(this.userToken);
    });
  }
  async getOrderData(id){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner:'bubbles',
      animated:true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.orders_product_data = [];
    await this.orderService.getToOrderLoc().then(item=>{
     if(item != null){
      item.forEach(element => {
      
        this.orderService.retrieveOrder(element.id).subscribe(async val=>{
          // console.log(val)
          this.orders_product_data.push(val);
          await this.loading.dismiss();
          // val['line_items'].forEach(element1 => {
          //   // console.log()
          //  this.productService.getOneProduct(parseInt(element1.product_id)).subscribe( async data=>{
          //   this.orders_product_data.push(data);
          //   // console.log(data);
          //   await this.loading.dismiss();
          //  })
          // });
        })
         });
     }
  
    })
  
  }

  openOrderDetails(data){
    let navigationExtras: NavigationExtras =  {
      state: {
        order_Details:data,
        
      }
    }
    this.router.navigate(['/oredr-view'],navigationExtras)
  }

}
