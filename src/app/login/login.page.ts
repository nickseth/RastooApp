import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../api/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      // Validators.email, [Validators.required]
      username: [''],
      password: [''],
    });
  }
  // [Validators.required, Validators.minLength(6)]
  async login() {
    // this.http.get(`https://rastoo.com/wp-json/custom-plugin/login?username=john.doe&password=test@123`).subscribe(val=>{
    //   console.log(val['ID'])
    // })
    // console.log(this.credentials.value)
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          cssClass:'error_mess',
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }



}