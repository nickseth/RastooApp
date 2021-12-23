import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController,AlertController } from '@ionic/angular';
import { AuthenticationService } from '../api/authentication.service';
import { CartService } from '../api/cart.service';
import { ProductsService } from '../api/products.service';
import { Storage } from '@ionic/storage-angular';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {
  product_id: any;
  variation_id: any;
  product_res: any;
  image_url: any;
  pro_descrip: any
  loading: any;
  pro_name: any;
  varients: string;
  product_pri_attr: any = [];
  quantity_name: any;
  pro_type: any;
  price_selected: any = null;
  price_html: any;
  userToken: any;
  quantites: any = 1;
  badgeValue: any = 0;
  array_cart: any;
  price: any;
  related_pro:any;
  upselling_pro:any;
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };
  img_urls_arr:any;
  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private authToken: AuthenticationService,
    private cart: CartService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) {
    this.product_id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getData(this.product_id);

    this.authToken.getToken().then(val => {
      this.userToken = val.value;
    });

    this.storage.create();
    this.storage.get(`product_cart`).then(async data => {
      if (data != null) {
        this.badgeValue = data.length;
        console.log(data)
      }

    });


  }

  ngOnInit() {
  }

  async getData(id) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      spinner: 'bubbles',
      animated: true,
      translucent: true,
    });
    await this.loading.present();
    this.productService.getOneProduct(id).subscribe(async val => {
      console.log(val)
     this.product_res =  await val;
      this.image_url = this.product_res.images[0].src;
      this.pro_descrip = this.product_res.description;
      this.pro_name = this.product_res.name;
      this.pro_type = this.product_res.type;
      this.price_html = this.product_res.price_html;
      this.price = this.product_res.price
      if (this.product_res.type == 'variable') {
        this.product_res.attributes.forEach(element => {
          this.quantity_name = element.name;
          let pro_len = this.product_res.variations.length;

          for (let i = 0; i < pro_len; i++) {
            let obj_pro = {};
            obj_pro['options'] = element.options[i];
            obj_pro['varient_id'] = this.product_res.variations[i]
            this.product_pri_attr.push(obj_pro);
          }

        });
      }
      this.related_pro = [];
      this.upselling_pro = [];
      this.img_urls_arr = [];
      this.product_res.related_ids.forEach(element22 => {
        this.productService.getOneProduct(element22 ).subscribe( val2=>{
        this.related_pro.push(val2);
        });
      });
      this.product_res.images.forEach(ele_url => {
        this.img_urls_arr.push(ele_url.src);
      });
      this.product_res.upsell_ids.forEach(element22 => {
        this.productService.getOneProduct(element22 ).subscribe(async val3=>{
        this.upselling_pro.push(val3);
           await this.loading.dismiss();
        },async error=>{
           await this.loading.dismiss();
        }
        );
        
      });
     
    })
  }
  async getDataWithVarient(id, varient_id) {

    this.productService.getOneProductWithVarient(id, varient_id).subscribe(val => {
      this.price_selected = val['price'];

    })
  }
  async getPrice(var_id) {
    if (var_id != 'null') {
      this.variation_id = var_id;
      await this.getDataWithVarient(this.product_id, var_id);
    } else {
      this.price_selected = null;
    }
  }


  async addProToCart() {
   
    if (this.pro_type == "simple") {
      let data_pro_simple = { product_id: this.product_id, img_url: this.image_url, price: this.price, total_price: this.price, product_name: this.pro_name, quantity: 1 };
      this.finalAddToCart(data_pro_simple);
    }
    if (this.pro_type == "variable") {
      if (this.price_selected != null) {
        let data_pro_variable = { product_id: this.product_id, variation_id: this.variation_id, img_url: this.image_url, price: this.price_selected, total_price: this.price_selected, product_name: this.pro_name, quantity: 1 }
        this.finalAddToCart(data_pro_variable);
      } else {
        const toast = await this.toastController.create({
          message: 'Please Select variation',
          position: 'middle',
          // duration: 2000
        });
        toast.present();
      }

    }
  }

  finalAddToCart(data_pro) {
    this.cart.getCartStorage().then(async data => {
      this.array_cart = data;

      if (data != null) {
        let filggd = data.findIndex(itm => { return itm.id == this.product_id });

        if (filggd > -1) {
          const toast = await this.toastController.create({
            message: 'Item already in Cart',
            position: 'middle',
            // duration: 2000
          });
          toast.present();
        } else {
          this.toastController.create({
            header: 'Hurrayy!',
            message: 'Added to Cart!',
            position: 'middle',
            // duration: 5000,
            cssClass: 'my-custom-class',
            buttons: [
              {
                // side: 'start',
                icon: 'cart',
                text: 'View Cart',
                cssClass: 'cart-btn',
                handler: () => {
                  this.router.navigateByUrl('/tabs/cart');
                }
              }, {
                // side: 'end',
                text: 'Continue',
                role: 'cancel', 
                cssClass: 'continue-btn',  
                handler: () => {
                  this.router.navigateByUrl('/tabs/home');
                  // console.log('Close clicked');
                }
              }
            ]
          }).then((obj) => {
            obj.present();
          });
          this.array_cart.push(data_pro)

          if (this.cart.addToCart(this.array_cart)) {
            this.updateCartBadge();
          }
        }
      } else {

        this.toastController.create({
          header: 'Hurrayy!',
          message: 'Added to Cart!',
          position: 'middle',
          // duration: 5000,
          cssClass: 'my-custom-class',
          buttons: [
            {
              // side: 'start',
              icon: 'cart',
              text: 'View Cart',
              cssClass: 'cart-btn',
              handler: () => {
                this.router.navigateByUrl('/tabs/cart');
              }
            }, {
              // side: 'end',
              text: 'Continue',
              role: 'cancel',
              cssClass: 'continue-btn',
              handler: () => {
                this.router.navigateByUrl('/tabs/home');
              }
            }
          ]
        }).then((obj) => {
          obj.present();
        });
        this.array_cart = [];
        this.array_cart.push(data_pro)
        this.storage
          .set(`product_cart`, this.array_cart)
          .then(() => {
            this.updateCartBadge();
          });

      }
    });
  }
  updateCartBadge() {
    this.badgeValue = this.badgeValue + 1;
  }
  openProducts(id) {
    this.router.navigate(['productdetail', { id: id }]);
  }

}

