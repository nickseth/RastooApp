import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../api/products.service';
import { IonSlides } from '@ionic/angular';
import { CartService } from '../api/cart.service';
// import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage  {

  public folder: string;
  allProductsData: any;
  loading: any;
  categories: any;
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  badgeValue: any;
  constructor(
    private products: ProductsService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private loadingController: LoadingController,
    private cartStorage: CartService
  ) {
    activatedRoute.params.subscribe(val => {
      this.cartProductData();
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    });
    this.getAllProduct();

    // this.storage.create();

  }
  ionViewWillEnter(){
    console.log("hello")
  }


  cartProductData() {
    this.cartStorage.getCartStorage().then(data => {
      // console.log(data)
      if (data != null) {
        this.badgeValue = data.length;
        console.log(data)
      } else {
        this.badgeValue = null;
      }
    })
  }


  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  async getAllProduct() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'bubbles',
      animated: true,
      backdropDismiss: true,
      translucent: true,
    });
    await this.loading.present();
    this.products.getCategory().subscribe((res) => {
      this.categories = res;
    });
    let data = await this.products.getProductAll();
    data.subscribe(val => {
      this.allProductsData = val;
      // console.log(val)
      this.allProductsData.forEach(element => {
        // console.log(element)
        this.loading.dismiss();
      });

    })
  }

  openProducts(id) {
    this.route.navigate(['productdetail', { id: id }]);
  }
  openCategories() {
    this.route.navigate(['allcategories']);
  }
  openCategoryOnes(id) {
    this.route.navigate(['category', { id: id }]);
  }

  getProductList(event) {
    this.getAllProduct();
    this.cartProductData();
    if (event) {
      return event.target.complete();
    }
  }

}
