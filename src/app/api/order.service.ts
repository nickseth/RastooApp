import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl:any = "https://rastoo.com/";
  consumerKey:any='ck_721aeb6292ccbe822356bab0bee0de026a7873d4';
  consumerSecret:any='cs_4ae439c1c84d402f02d3716ab06a4ec90ad4b56e';
  httpOptions = {
    headers: new HttpHeaders(
    { 
    'Content-Type': 'application/json',
    "Authorization":"Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl"
   })
  }
  constructor(public http: HttpClient,
    private loc_storage:Storage
    ) { 
      this.loc_storage.create();
    }

  createOrder(data){
    return this.http.post(`${this.baseUrl}wp-json/wc/v3/orders`,JSON.stringify(data),this.httpOptions);
    }
    retrieveOrder(id){
      let httpOptions2 = {
        headers: new HttpHeaders(
        { 
        "Authorization":"Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl"
       })}
      // ?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}
      return this.http.get(`${this.baseUrl}wp-json/wc/v3/orders?customer=${id}`,this.httpOptions);
      }

      // addToOrderLoc(data){
      //   //  return this.http.post(`https://94d.2a4.myftpupload.com/wp-json/wc/store/cart/items?id=${data.id}&quantity=${data.quantity}`, this.httpOptions)
      //     if( this.loc_storage
      //       .set(`order_all`,data)){
      //         return true;
      //       }
      //   }
        cancelOrders(id,data){
       return this.http.put(`${this.baseUrl}wp-json/wc/v3/orders/${id}`,data,this.httpOptions);
        }

        // getToOrderLoc(){
        //   return this.loc_storage.get(`order_all`);
        //   }
}
