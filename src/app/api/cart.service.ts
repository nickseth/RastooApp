import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:any = "https://94d.2a4.myftpupload.com/";
  consumerKey:any='ck_8f6c807436767c3d624b3d376f3d5f35dda9843b';
  consumerSecret:any='cs_7d00dabdaaf420f84555e465ee0c49b78406c765';
httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  pro_data: any[];
  constructor(public http: HttpClient,
    private storage:Storage
    ) { 
      this.storage.create();

    }

  addToCart(data){
  //  return this.http.post(`https://94d.2a4.myftpupload.com/wp-json/wc/store/cart/items?id=${data.id}&quantity=${data.quantity}`, this.httpOptions)
    if( this.storage
      .set(`product_cart`,data)){
        return true;
      }
    
   
  }

  getCartStorage(){
    return this.storage.get(`product_cart`);
  }

  clearCartStorage(){
   if(this.storage.remove(`product_cart`)){
    return true;
   }
  }
// removeOneItem(id){
//   let cart_data = this.getCartStorage();
//   cart_data.then(val=>{
//     let index = val.findIndex((element, index)=>element.id === id);
//     val.splice(index,1);
//         if(this.storage.set('product_cart',cart_data)){
//          console.log("deleted")
//         }
     
//      })

// }

}
