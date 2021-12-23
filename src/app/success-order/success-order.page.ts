import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {
  OrderDetails: any;

  constructor(public route:ActivatedRoute,private router: Router,) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.OrderDetails = this.router.getCurrentNavigation().extras.state.Order_Success_place;
      
  //  console.log(this.OrderDetails)
      }
    });

  }

  ngOnInit() {
  }

}
