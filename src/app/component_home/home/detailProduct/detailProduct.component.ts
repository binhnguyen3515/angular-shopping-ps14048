import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, pluck } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { GlobalVariable } from 'src/app/common/globalVariable';
@Component({
  selector: 'app-detailProduct',
  templateUrl: './detailProduct.component.html',
  styleUrls: ['./detailProduct.component.css']
})
export class DetailProductComponent implements OnInit {
  url1 = this.rest.baseUrl+'rest/products/detail';
  url2 = this.rest.baseUrl+'rest/products/cateID';
  detailProduct!: Product;
  products!: Product[];
  categoryId!:string;
  GlobalVariable="";
  constructor(private rest:RestApiService,private route:ActivatedRoute,private cartService:CartService) { 
    this.GlobalVariable = GlobalVariable.baseHostImageUrl
  }

  ngOnInit() {
    //getDetailedProduct By ID
    this.route.params.pipe(
      delay(15),
      pluck('id')
    ).subscribe(data => {
      this.rest.getOne(this.url1,data).subscribe((data)=>{
        this.detailProduct = data as Product;
        this.categoryId = this.detailProduct.category.id;
        //get products by categoryID
        this.rest.get(this.url2+"/"+this.categoryId).subscribe((data)=>{
          this.products = data as Product[];
        })
      })
    })
  }
  
  addToCart(product:Product){
    this.cartService.addItem(product);
  }
}
