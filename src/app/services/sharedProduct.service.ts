import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedProductService {
  

  private sharedData = new BehaviorSubject<string>('default message');
  currentData = this.sharedData.asObservable();

  private passProductById = new BehaviorSubject<any>('edit');
  currentProductById = this.passProductById.asObservable();

  private passCreateProductValue = new BehaviorSubject<any>('no item');
  currentCreateProductValue = this.passCreateProductValue.asObservable();

  private passUpdateProductValue = new BehaviorSubject<any>('no item');
  currentUpdateProductValue = this.passUpdateProductValue.asObservable();

  private passDeleteProduct = new BehaviorSubject<any>('no item');
  currentDeleteProduct = this.passDeleteProduct.asObservable();

  constructor(private rest:RestApiService) {
    
  }

  changeData(data: string) {
    this.sharedData.next(data);
  }

  passProductByIdToForm(item:any){
    this.passProductById.next(item);
  }

  _passCreateProductValue(item:any){
    this.passCreateProductValue.next(item);
  }

  _passUpdateProductValue(item:any){
    this.passUpdateProductValue.next(item);
  }

  _passDeleteProduct(productId: any) {
    this.passDeleteProduct.next(productId);
  }
  
  ngOnInit(){
    
  }

}
