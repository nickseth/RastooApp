import { Component } from '@angular/core';
import { Platform, IonRouterOutlet,MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
// import { AuthenticationService } from './api/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
private platform:Platform,
private _location:Location,
private router:Router,

  ) {

    this.backButtonEvent();
  }

  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(10,()=>{
  
      const path = window.location.pathname;
      console.log(path)
      if(path === '/tabs/home'){
        navigator['app'].exitApp();
      } else{
        this._location.back();
      }
    });
  }


}
