import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthenticationService } from '../api/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  url_home:any = '/tabs/Home';
  public appPages = [
    { title: 'My Account', url: '/account', icon: 'person' },
    { title: 'My Orders', url: '/orders', icon: 'paper-plane' },
    { title: 'My Cart', url: '/tabs/cart', icon: 'cart' },
    { title: 'Address', url: '/billing-address', icon: 'archive' },
    { title: 'Privacy Policy', url: '/privacy-policy', icon: 'archive' }
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor(public router: Router,
    private authService:AuthenticationService,
    private menu: MenuController
    ) {}
  // serchpage() {
  //   this.router.navigateByUrl('/search');
  // }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    this.menu.open('end');
  }
}
