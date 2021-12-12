import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, delay, pluck, retry } from 'rxjs/operators';
import { Paging } from 'src/app/common/paging';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SharedCateService } from 'src/app/services/sharedCate.service';
import { SharedProductService } from 'src/app/services/sharedProduct.service';
import {GlobalVariable} from 'src/app/common/globalVariable';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  products: Product[]=[];
  pageSlice:Product[]=[];
  totalPages:any = [];
  selectedIndex:number = 0;
  paging!:Paging<Product>;
  cid:any=null;

  sortType:string = "default message";

  url = this.rest.baseUrl+'rest/products';
  baseHostImageUrl = "";
  data$:any;
  data2$:any;
  constructor(
    private rest:RestApiService,
    private data: SharedProductService,
    private data2:SharedCateService,private cartService:CartService) {
      this.baseHostImageUrl = GlobalVariable.baseHostImageUrl;
  }
  

  ngOnInit() {

    // this.products = this.data.Products;
    //get message from cate component
    this.data2$ = this.data2.currentData.subscribe(data=>{
      // console.log(data);
      this.cid = data;
      this.rest.get(this.url + '?cid=' + data + '&sortType=' + this.sortType).subscribe(data=>{
        this.sharedMethodRestApi(data);
      });
    })
    //get message from sort component
    this.data$ = this.data.currentData.subscribe(data =>{
      this.sortType = data
      if(this.sortType !== 'default message'){
        if(this.cid!==null){
          this.rest.get(this.url + '?cid=' + this.cid + '&sortType=' + this.sortType).subscribe(data=>{
            this.sharedMethodRestApi(data);
          });
          
        }
        if(this.cid===null){
          this.rest.get(this.url + '?sortType=' + this.sortType).pipe(delay(15)).subscribe((data)=>{
            this.sharedMethodRestApi(data);
          })
        }
      }
    });
    if((this.cid==='default message' || this.cid === null) && this.sortType ==='default message'){
      this.cid = null;
      this.rest.get(this.url).pipe(delay(15)).subscribe((data)=>{
        this.sharedMethodRestApi(data);
      })
    }
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
    this.data2$.unsubscribe();
  }

  private sharedMethodRestApi(data: Object) {
    this.paging = data as Paging<Product>;
    this.totalPages = Array.from(Array(this.paging.totalPages).keys());
    this.selectedIndex = 0;
  }

  toPage(page: number){
    this.paginatingMethod(page);
  }
  
  prev(page:number){
    console.log("prev:"+page);
    if(page == -1){
      return;
    }
    this.paginatingMethod(page);
  }

  next(page:number){
    console.log("next:"+page);
    if(page==this.paging.totalPages){
      return;
    }
    this.paginatingMethod(page);
  }

  private paginatingMethod(page: number) {
    this.rest.get(this.url + '?cid=' + this.cid + '&sortType=' + this.sortType +'&page=' + page).pipe(delay(15)).subscribe((data) => {
      this.paging = data as Paging<Product>;
      this.totalPages = Array.from(Array(this.paging.totalPages).keys());
      this.selectedIndex = page;
    });
  }

  addToCart(product:Product){
    this.cartService.addItem(product);
  }
  // onPageChange(event:PageEvent) {
  //   const startIndex = event.pageIndex * event.pageSize;
  //   let endIndex = startIndex + event.pageSize;
  //   if(endIndex > this.products.length){
  //     endIndex = this.products.length;
  //   }
  //   this.pageSlice = this.products.slice(startIndex,endIndex);
  // }
  // private paginateActivate() {
  //   this.pageSlice = this.products.slice(0, 6);
  // }
}
