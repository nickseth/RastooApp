import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { OrderService } from '../api/order.service';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-oredr-view',
  templateUrl: './oredr-view.page.html',
  styleUrls: ['./oredr-view.page.scss'],
})
export class OredrViewPage implements OnInit {
  OrderDetails: any;
  itemImages: any;
  loading: any;
  constructor(public route: ActivatedRoute,
     private router: Router,
      private productService: ProductsService,
      private orderApi:OrderService,
      private loadingController:LoadingController,
      
      ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.OrderDetails = this.router.getCurrentNavigation().extras.state.order_Details;
        this.itemImages = [];
        console.log(this.OrderDetails)
        this.OrderDetails.line_items.forEach(element => {

          this.productService.getOneProduct(element.product_id).subscribe(async data => {

            this.itemImages.push({ src: data['images'][0].src, id: element.product_id, name: element.name });


          })
        });
      }
    });

  }

  ngOnInit() {


  }

  openProducts(id){
   
    this.router.navigate(['productdetail', { id: id}]); 
  }
 async cancelOrder(id){
   
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    let data = {
      status: "cancelled"
    }
    this.orderApi.cancelOrders(id,data).subscribe(async val => {
 
 await this.loading.dismiss();
 this.router.navigateByUrl('/orders');
    },async error=>{
      await this.loading.dismiss();
     alert(error.error.error)
   });
  }

}
