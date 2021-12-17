import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard] // Secure all child pages
    
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canLoad: [ AutoLoginGuard] // Check if we should show the introduction or forward to
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    // canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'productdetail',
    loadChildren: () => import('./productdetail/productdetail.module').then( m => m.ProductdetailPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'allcategories',
    loadChildren: () => import('./allcategories/allcategories.module').then( m => m.AllcategoriesPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'shipping-address',
    loadChildren: () => import('./shipping-address/shipping-address.module').then( m => m.ShippingAddressPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'billing-address',
    loadChildren: () => import('./billing-address/billing-address.module').then( m => m.BillingAddressPageModule)
  },
  {
    path: 'paymentmethod',
    loadChildren: () => import('./paymentmethod/paymentmethod.module').then( m => m.PaymentmethodPageModule)
  },
  {
    path: 'success-order',
    loadChildren: () => import('./success-order/success-order.module').then( m => m.SuccessOrderPageModule)
  },
  {
    path: 'oredr-view',
    loadChildren: () => import('./oredr-view/oredr-view.module').then( m => m.OredrViewPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
