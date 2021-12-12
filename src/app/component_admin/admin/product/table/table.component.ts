import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GlobalVariable } from 'src/app/common/globalVariable';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SharedProductService } from 'src/app/services/sharedProduct.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnDestroy {
  products!:Product[];
  createProduct$:any;
  updateProduct$:any;
  deleteProduct$:any;
  //dttrigger to fetch long list of products
  //to ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) datatableElement!: DataTableDirective;
  constructor(private rest:RestApiService,private sharedProduct:SharedProductService,private message:AlertService,private chRef:ChangeDetectorRef) { }
  
  //Select tab index
  @Output()selectTabIndex:EventEmitter<any> = new EventEmitter<any>();

  dtOptions:DataTables.Settings = {};
  ngOnInit() {
    //data table setting
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:8,
      lengthMenu: [ [8, 16, 24, -1], [8, 16, 24, "All"] ]
    }
    // load product list
    this.rest.get(this.rest.baseUrl+"rest/products/list").pipe(delay(15)).subscribe(data=>{
      this.products = data as Product[];
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
    // create product pass data from productForm to table
    this.createProduct$=this.sharedProduct.currentCreateProductValue.subscribe(data => {
      if(data !== 'no item'){
        this.products.push(data);
        this.rerenderDataTable();
      }
    })
    // update product pass data from productForm to table
    this.updateProduct$=this.sharedProduct.currentUpdateProductValue.subscribe(data =>{
      if(data !== 'no item'){
        const index = this.products.findIndex(p=>p.id == data.id)
        this.products[index] = data;
        this.rerenderDataTable();
      }
    })
    // delete product pass data from productForm to table
    this.deleteProduct$=this.sharedProduct.currentDeleteProduct.subscribe(id=>{
      if(id !== 'no item'){
        const index = this.products.findIndex(p=>p.id == id);
        this.products.splice(index,1);
        this.rerenderDataTable();
      }
    })
  }

  edit(item:Product){
    this.sharedProduct.passProductByIdToForm(item);
    //send data to product component to switch tabIndex
    this.selectTabIndex.emit();
  }

  delete(productId:number){
    this.rest.delete(GlobalVariable.baseUrl+"rest/products",productId).subscribe(data=>{
      const index = this.products.findIndex(p=>p.id == productId);
      this.products.splice(index,1);
      this.message.successMessage("Remove Completed!");
    },err=>{
      this.message.errorMessage(err.error.message);
    })
  }

  rerenderDataTable(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
      this.sharedProduct._passCreateProductValue('no item');
      this.sharedProduct._passUpdateProductValue('no item');
      this.sharedProduct._passDeleteProduct('no item');
      this.sharedProduct.passProductByIdToForm('edit');
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.createProduct$.unsubscribe();
    this.updateProduct$.unsubscribe();
    this.deleteProduct$.unsubscribe();
  }
}
