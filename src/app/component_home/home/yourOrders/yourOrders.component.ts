import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/guards/tokenStorage.service';
import { Order } from 'src/app/models/Order';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-yourOrders',
  templateUrl: './yourOrders.component.html',
  styleUrls: ['./yourOrders.component.css']
})
export class YourOrdersComponent implements OnInit {

  orderList!:Order[];

  constructor(private rest:RestApiService,private tokenStorage:TokenStorageService) { }

  ngOnInit() {
    this.rest.getOne(this.rest.baseUrl+"rest/orders/list",this.tokenStorage.getUser().username).subscribe(data=>{
      this.orderList = data as Order[];
    },error=>{
      console.log(error.error.message);
    })
  }
}
