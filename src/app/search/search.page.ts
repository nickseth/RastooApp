import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  allProductsData: any;
  filterTerm: string;
  loading: any=false;
  
  constructor(
private products:ProductsService,
private route:Router,
private loadingController:LoadingController
  ) {
    this.getAllProduct();
   }

  ngOnInit() {
  }
  async getAllProduct(){
    // this.loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   backdropDismiss: true,
    //   translucent: true,
    // });
    // await this.loading.present();
    
    let data = await this.products.getProductAll();
   data.subscribe(val =>{
   this.allProductsData = val;
   this.allProductsData.forEach(element => {
     this.loading=true;
    //  console.log(element)
    // this.loading.dismiss();
   });
   
   })
   }
   
   openProducts(id){
     this.route.navigate(['productdetail', { id: id }]);
   }
   doInfinite(e){
     console.log(e)

   }

}
