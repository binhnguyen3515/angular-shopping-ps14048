import { CartService } from './../../../services/cart.service';
import { Order } from './../../../models/Order';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/guards/auth.service';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { DatePipe } from '@angular/common'
import { TokenStorageService } from 'src/app/guards/tokenStorage.service';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:Product[] = [];
  showCheckOut = false;
  today:Date = new Date();

  order:any;
  orderID!:number;
  purchaseForm = new FormGroup({
    'username':new FormControl(this.tokenStorage.getUser().username),
    'createDate':new FormControl(this.datepipe.transform(new Date(),'dd-MM-yyyy')),
    'address':new FormControl('')
  })
  constructor(
    private cartService: CartService,
    private message:AlertService,private auth: AuthService,private route:Router,
    private datepipe:DatePipe,private tokenStorage:TokenStorageService,
    private rest:RestApiService) { }


  ngOnInit() {
    this.cartService.numberOfItems.subscribe(data=>{
      this.cartItems = data;
    })
    // this.inputQuantity.setValue({})
    // this.inputQuantity.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
    // .subscribe(value=>{
    //   console.log(value);
    // })
  }
  quantityChange(event:any,item:Product){
    this.cartService.updateCart(+event.value, item);
  }
  remove(id:number){
    this.cartService.remove(id);
  }
  clear(){
    this.cartService.clear();
  }
  checkout(){
    if(!this.auth.isLoggedIn()){
      this.message.warningMessage('Please login to check-out');
      this.route.navigate(['home/login']);
      this.showCheckOut = false;
    }else{
      this.showCheckOut = true;
    }
  }

  getOrderDetails(){
    return this.cartService.CartItems.map((item:Product)=>{
      return{
        product:{id:item.id},
        price:item.price,
        quantity:item.quantity
      }
    })
  }

  purchase(){
    if(this.purchaseForm.valid){
      this.order = {
        createDate:new Date(),
        address:this.purchaseForm.get('address')!.value,
        account:{username:this.tokenStorage.getUser().username},
        orderDetails:this.getOrderDetails()
      }
      this.rest.post(this.rest.baseUrl+"rest/orders",this.order).subscribe(data=>{
        this.message.successMessage("Thank you for your purchase!");
        let getData = data as Order;
        this.cartService.clear();
        this.route.navigate(['/home/orderInfo',{id:getData.id}])
      },err=>{
        this.message.errorMessage("The service is unavailable at the moment, please come back later!");
      })
    }

    // this.route.navigate(['home/purchase'])
  }
}
