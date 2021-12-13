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
  allProductsData = [];
  loading: any;
  url: string;
  page_number = 1;
  page_limit = 10;
  constructor(
private activatedRoute:ActivatedRoute,
private products:ProductsService,
private loadingController:LoadingController,
private route:Router
  ) {
    this.category_id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.category_id){
   this.firstGet();
    }
   }

   async firstGet(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      translucent: true,
      spinner:'bubbles',
      animated:true,
    });
    await this.loading.present();
    this.getCategoryData(this.category_id,false, "");
   }

  ngOnInit() {
  }
  async getCategoryData(id,isFirstLoad, event){
    this.url = '?_page=' + this.page_number + '&_limit=' + this.page_limit;
 
  this.products.getCategoryOnes(id,this.url).subscribe((val:any)=>{
    this.loading.dismiss();
  for (let i = 0; i < val.length; i++) {
    this.allProductsData.push(val[i]);
  }

  if (isFirstLoad)
    event.target.complete();

  this.page_number++;
}, error => {
  console.log(error);
})
  }
  openProducts(id){
    this.route.navigate(['productdetail', { id: id }]);
  }
  doInfinite(event) {
    this.getCategoryData(this.category_id,true, event);
  }

}
