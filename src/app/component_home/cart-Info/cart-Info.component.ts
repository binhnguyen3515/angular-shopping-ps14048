import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-Info',
  templateUrl: './cart-Info.component.html',
  styleUrls: ['./cart-Info.component.css']
})
export class CartInfoComponent implements OnInit {
  totalItems:number=0;
  totalAmount:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cartService.numberOfItems.subscribe(data=>{
      this.totalItems = data.map(item=>item.quantity).reduce((sum, qty)=>sum+=qty,0);
      this.totalAmount = data.map(item=>item.quantity*item.price).reduce((sum, qty)=>sum+=qty,0);
    });
  }

}
