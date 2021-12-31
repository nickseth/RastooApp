import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  loading: any;
  categories: Object;
  constructor(
    private loadingController:LoadingController,
    private products:ProductsService,
    private route:Router

  ) { 
    this.getCategories();
  }

  ngOnInit() {
  }
  async getCategories(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
    this.products.getCategory().subscribe(async (res) => {
      this.categories = res;
      console.log(res)
      this.loading.dismiss();
    },async error=>{
      await this.loading.dismiss();
     alert(error.error.error)
   });
  }
  openCategory(id){
    this.route.navigate(['category', { id: id }]);
  }

}
