import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../api/products.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category_id: string;
  allProductsData: Object;
  loading: any;

  constructor(
private activatedRoute:ActivatedRoute,
private products:ProductsService,
private loadingController:LoadingController,
private route:Router
  ) {
    this.category_id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.category_id){
      this.getCategoryData(this.category_id);
    }
   }

  ngOnInit() {
  }
  async getCategoryData(id){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
  this.products.getCategoryOnes(id).subscribe(val=>{
  this.allProductsData = val;
  this.loading.dismiss();
  console.log(val);
})
  }
  openProducts(id){
    this.route.navigate(['productdetail', { id: id }]);
  }

}
