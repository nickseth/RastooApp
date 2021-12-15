import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../api/cart.service';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  pro_data: any;
  pro_length: any;
  total_po_price: any = 0;
  constructor(
    private product_data: ProductsService,
    private cartService: CartService,
    public activatedRoute:ActivatedRoute
  ) {
    activatedRoute.params.subscribe(val => {
      this.getCartData();
    });

  }

  ngOnInit() {
    
  }

  getCartData() {
    this.total_po_price = 0;
    this.cartService.getCartStorage().then(val => {
      this.pro_data = val;
      if (this.pro_data != null) {
        this.pro_length = this.pro_data.length;
        this.pro_data.forEach(element => {
          this.total_po_price = (parseFloat(this.total_po_price) + parseFloat(element.total_price)).toFixed(2);

        });
      }

    })
  }

  clearCrtAll() {
    if (this.cartService.clearCartStorage()) {
      this.getCartData();
    }
  }

  getUsersList(event) {
    this.getCartData();
    if (event) {
      return event.target.complete();
    }
  }
  removeOneItem(item) {
    let cart_data = this.cartService.getCartStorage();
    cart_data.then(val => {
      let index = val.findIndex((element, index) => element.id === item);
      if (val.length > 1) {
        val.splice(index, 1);
        if (this.cartService.addToCart(cart_data)) {
          setTimeout(() => {
            this.getCartData();
          }, 1000);

        }
      } else {
        if (this.cartService.clearCartStorage()) {
          setTimeout(() => {
            this.getCartData();
          }, 1000);
        }
      }
    })
  }


  addQuantity(data, id) {
    // console.log(data,id)
    if (data == 'plus') {
      this.cartService.getCartStorage().then(val => {
       
        let objIndex = val.findIndex((obj => obj.product_id == id));
      
        val[objIndex].quantity = val[objIndex].quantity + 1;
        val[objIndex].total_price = (val[objIndex].price * val[objIndex].quantity).toFixed(2);
        if (this.cartService.addToCart(val)) {
          setTimeout(() => {
            this.getCartData();
          }, 100);
        }
      })
    }
    if (data == 'min') {
      this.cartService.getCartStorage().then(val => {
        let objIndex = val.findIndex((obj => obj.product_id == id));
        if (val[objIndex].quantity! > 1) {
          val[objIndex].quantity = val[objIndex].quantity - 1;
          val[objIndex].total_price = (val[objIndex].price * val[objIndex].quantity).toFixed(2);
          if (this.cartService.addToCart(val)) {
            setTimeout(() => {
              this.getCartData();
            }, 100);
          }
        } else {
          if (this.cartService.addToCart(val)) {
            setTimeout(() => {
              this.getCartData();
            }, 100);
          }
        }

      })


    }
  }

}
