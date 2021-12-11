import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // endpoint = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization":"Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl" })
  };
  // https://rastoo.com/wp-json/wc/v3/products?consumer_key=ck_a33dead7bbfc240066e04aa5adcb3e2ddd7f673e&consumer_secret=cs_03241e38f86a3014948af1e4fdb48347588b8c17
  baseUrl:any = "https://rastoo.com/";
  consumerKey:any='ck_721aeb6292ccbe822356bab0bee0de026a7873d4';
  consumerSecret:any='cs_4ae439c1c84d402f02d3716ab06a4ec90ad4b56e';
 
  constructor(public http: HttpClient) { }

  getCategory(){
    return   this.http.get(`${this.baseUrl}wp-json/wc/v3/products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
  }
  getProductAll(){
    return this.http.get(`${this.baseUrl}wp-json/wc/v3/products?per_page=100&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
  }
  getOneProduct(id){
    return this.http.get(`${this.baseUrl}wp-json/wc/v3/products/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
  }

  getCategoryOnes(id){
    return this.http.get(`${this.baseUrl}wp-json/wc/v3/products?category=${id}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
  }
  getOneProductWithVarient(id,var_id){
    return this.http.get(`${this.baseUrl}wp-json/wc/v3/products/${id}/variations/${var_id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`);
  }

 
 

}
