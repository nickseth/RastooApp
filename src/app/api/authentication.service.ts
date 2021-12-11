import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
// import { Storage } from '@capacitor/storage';

 
const TOKEN_KEY = 'my-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
 
  constructor(private http: HttpClient,private storage:Storage) {
    this.storage.create();
    this.loadToken();
  }
 
  async loadToken() {
    const token = await this.storage.get('my-token');    
    if (token) {
      // console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {username, password}): Observable<any> {
  
    // return this.http.post(`https://rastoo.com/wp-json/jwt-auth/v1/token`, credentials ).pipe(
    //   map((data: any) => data.token),
    //   switchMap(token => {
    //     return from(Storage.set({key: TOKEN_KEY, value: token}));
    //   }),
    //   tap(_ => {
    //     this.isAuthenticated.next(true);
    //   })
    // )
  return this.http.post(`https://rastoo.com/wp-json/custom-plugin/login`,credentials).pipe(
        map((data: any) => data['ID']),
        switchMap(token => {
          console.log(token);
          return from(this.storage.set('my-token', token));
        }),
        tap(_ => {
          this.isAuthenticated.next(true);
        })
      )
  }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove('my-token');
  }

  getToken(){
    return this.storage.get('my-token');
   }
}