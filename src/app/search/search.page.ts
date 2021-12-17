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
  allProductsData: any =null;
  filterTerm: string;
  loading: any=false;
  
  constructor(
private products:ProductsService,
private route:Router,
// private loadingController:LoadingController
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
   data.subscribe(async val =>{
    // await this.loading.dismiss();
   this.allProductsData = val;
   console.log(this.allProductsData.length)
   this.allProductsData.forEach(async element => {
     this.loading=true;
    //  console.log(element)
    
   });
   
   })
   }
   
   openProducts(id){
     this.route.navigate(['productdetail', { id: id }]);
   }
   doInfinite(e){
     console.log(e)

   }

   onChangeSearch(e){
    this.loading=false;
    //  console.log(e.target.value)
     this.products.getSearch(e.target.value).subscribe(val=>{
      //  console.log(val)
      
      this.allProductsData = val;
      this.loading=true;
     })

   }

}
