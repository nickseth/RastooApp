import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../api/products.service';

@Component({
  selector: 'app-oredr-view',
  templateUrl: './oredr-view.page.html',
  styleUrls: ['./oredr-view.page.scss'],
})
export class OredrViewPage implements OnInit {
  OrderDetails: any;
 itemImages:any;
  constructor(public route:ActivatedRoute,private router: Router,private productService:ProductsService,) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.OrderDetails = this.router.getCurrentNavigation().extras.state.order_Details;
        this.itemImages = [];
        console.log(this.OrderDetails)
  this.OrderDetails.line_items.forEach(element => {
    
    this.productService.getOneProduct(element.product_id).subscribe( async data=>{
        
      this.itemImages.push({src:data['images'][0].src,id:element.id,name:element.name});
    
     
     })
  });
      }
    });

  }

  ngOnInit() {
    
    
  }

  getUrlImage(id){
 
         
          
        
  }

}
