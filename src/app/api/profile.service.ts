import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl:any = "https://rastoo.com/";
  consumerKey:any='ck_721aeb6292ccbe822356bab0bee0de026a7873d4';
  consumerSecret:any='cs_4ae439c1c84d402f02d3716ab06a4ec90ad4b56e';
  httpOptions = {
    headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
    "Authorization":"Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl"
   })
  }
  constructor(public http: HttpClient) { }

  getUserProfile(id){
    return this.http.get(`${this.baseUrl}wp-json/wc/v3/customers/${id}`,this.httpOptions);
   }

   updateProfile(id,data){
   return this.http.put(`${this.baseUrl}wp-json/wc/v3/customers/${id}`,JSON.stringify(data),this.httpOptions);
   }
}
