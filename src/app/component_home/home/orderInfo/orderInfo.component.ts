import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Order } from 'src/app/models/Order';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-orderInfo',
  templateUrl: './orderInfo.component.html',
  styleUrls: ['./orderInfo.component.css']
})
export class OrderInfoComponent implements OnInit {
  orderById!:Order;
  constructor(private activatedRoute:ActivatedRoute,private rest:RestApiService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      pluck('id'),
    ).subscribe(e=>{
      this.rest.getOne(this.rest.baseUrl+"rest/orders/detail",e).subscribe(e=>{
        this.orderById = e as Order;
      })
    })
  }
}
