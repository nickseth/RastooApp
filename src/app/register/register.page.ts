import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;
  requestOptions: any;
  nomachpass:any = 'none';
  Consumer_key:any =  "ck_721aeb6292ccbe822356bab0bee0de026a7873d4";
  Consumer_secret:any =  "cs_4ae439c1c84d402f02d3716ab06a4ec90ad4b56e";
  loading: any;
  constructor(
    public formBuilder: FormBuilder, 
    public http: HttpClient, 
    private router: Router,
    public alertController:AlertController,
    private loadingController:LoadingController

  ) { 
    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username:[''],
      email: [''],
      password: [''],
      conpassword: ['']
    })

  }

  ngOnInit() {
  }
  async submitForm() {
    // const headers = new HttpHeaders({
    //   "Authorization": "Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl",
    //   "Content-Type": "application/x-www-form-urlencoded"
    // });
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // "Authorization": "Basic Y2tfNzIxYWViNjI5MmNjYmU4MjIzNTZiYWIwYmVlMGRlMDI2YTc4NzNkNDpjc180YWU0MzljMWM4NGQ0MDJmMDJkMzcxNmFiMDZhNGVjOTBhZDRiNTZl",
      // "host": "https://rastoo.com/",
      // "origin": "http://localhost:8100",
      // "Access-Control-Request-Method": "POST",
      // "Access-Control-Request-Headers": "Content-Type"
    });
   const Consumer_key =  "ck_721aeb6292ccbe822356bab0bee0de026a7873d4";
   const Consumer_secret =  "cs_4ae439c1c84d402f02d3716ab06a4ec90ad4b56e";


// this.http.post(`https://rastoo.com/wp-json/wc/v3/customers?first_name=${this.ionicForm.value.first_name}&
// last_name=${this.ionicForm.value.last_name}&username=${this.ionicForm.value.username}&
// email=${this.ionicForm.value.email}&password=${this.ionicForm.value.password}&consumer_key=${
//     Consumer_key
//   }&consumer_secret=${Consumer_secret}`,
//   this.ionicForm.value,
//   {headers:header}
// ).subscribe(customerData => {
//   console.log(customerData);
// });


if(this.ionicForm.value.password == this.ionicForm.value.conpassword){
  this.nomachpass = 'none';
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    translucent: true,
    spinner:'bubbles',
    animated:true,
  });
  await this.loading.present();
  await this.http.post(`https://rastoo.com/wp-json/wc/v3/customers?first_name=${this.ionicForm.value.first_name}&
  last_name=${this.ionicForm.value.last_name}&username=${this.ionicForm.value.username}&
  email=${this.ionicForm.value.email}&password=${this.ionicForm.value.password}&consumer_key=${
      Consumer_key
    }&consumer_secret=${Consumer_secret}`,this.ionicForm.value, { headers: header })
    .subscribe(async data => {
      await this.loading.dismiss();
          this.ionicForm.reset();
          this.showAlert('Alert','User Successfully Registered.');
          this.router.navigate(['/login']);
    }, async error => {
      await this.loading.dismiss();
      this.showAlert('Alert',error.error.message);
      // console.log(error.error.message)
    });
} else{
  //
  this.nomachpass = 'block';
}
   
  }
  async showAlert(title,mess) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }
}
