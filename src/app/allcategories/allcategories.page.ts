import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.page.html',
  styleUrls: ['./allcategories.page.scss'],
})
export class AllcategoriesPage implements OnInit {
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
    this.products.getCategory().subscribe((res) => {
      this.categories = res;
      console.log(res)
      this.loading.dismiss();
    });
  }
  openCategory(id){
    this.route.navigate(['category', { id: id }]);
  }

}
