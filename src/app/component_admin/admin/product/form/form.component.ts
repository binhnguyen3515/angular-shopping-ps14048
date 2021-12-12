import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SharedProductService } from 'src/app/services/sharedProduct.service';
import {GlobalVariable} from 'src/app/common/globalVariable';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Category } from 'src/app/models/Category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  baseHostImageUrl = "";
  productForm = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    price:new FormControl(null,[Validators.required,Validators.min(0)]),
    image:new FormControl('cloud-upload.jpg'),
    category:new FormGroup({
      id: new FormControl(null,Validators.required),
      name: new FormControl(null)
    }),
    createDate:new FormControl(this.datepipe.transform(new Date(),'yyyy-MM-dd')),
    available:new FormControl('',Validators.required),
    id:new FormControl(null)
  })

  progress = 0;
  selectedFiles?:FileList;
  currentFile?:File;
  default = "Select a category";
  cateGory!:Category[];
  disabled = false;
  constructor(private rest:RestApiService,private sharedData:SharedProductService,private datepipe:DatePipe,private uploadService:FileUploadService,
    private message:AlertService) { 
    this.baseHostImageUrl = GlobalVariable.baseHostImageUrl;
  }

  ngOnInit() {
    this.sharedData.currentProductById.subscribe(data=>{
      if(data !=='edit'){
        this.productForm.patchValue(data as Product);
        this.disabled = true;
      }else{
        this.disabled = false;
      }

    })
    this.rest.get(GlobalVariable.baseUrl+"rest/categories").subscribe(data=>{
      this.cateGory = data as Category[];
      //chọn mặc định index = 0 trên thẻ select category
      this.productForm.get('category')!.setValue(this.cateGory[0]);
    })
  }
  selectFile(event:any){
    this.progress = 0;
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file:File | null = this.selectedFiles.item(0);
      console.log("file:"+file?.name);
      if(file){
        this.currentFile = file;
        this.uploadService.upload(this.currentFile,"images").subscribe(data=>{
          this.productForm.get('image')?.setValue(data.name);
        },err=>{
          console.log("err: "+err);
        })
        this.selectedFiles = undefined;
      }
    }
  }
  create(){
    if(this.productForm.valid){
      this.rest.post(GlobalVariable.baseUrl+"rest/products",this.productForm.value).subscribe(data=>{
        this.sharedData._passCreateProductValue(data as Product);
        this.message.successMessage("Insert Completed!");
        this.reset();
      },error=>{
        this.message.errorMessage(error.message);
      })
    }else{
      this.validateAllFormFields(this.productForm);
    }
  }

  update(){
    if(this.productForm.valid){
      this.rest.put(GlobalVariable.baseUrl+"rest/products",this.productForm.value,this.productForm.get('id')!.value).subscribe(data=>{
        this.sharedData._passUpdateProductValue(data as Product); 
        this.message.successMessage("Update Completed!");
      },error=>{
        this.message.errorMessage(error.message);
      })
    }else{
      this.validateAllFormFields(this.productForm);
    }
    
  }

  delete(){
    const productId = this.productForm.get('id')!.value;
    this.rest.delete(GlobalVariable.baseUrl+"rest/products",productId).subscribe(data=>{
      this.sharedData._passDeleteProduct(productId);
      this.message.successMessage("Remove Completed!");
    },err=>{
      this.message.errorMessage(err.error.message);
    })
    this.reset();
  }

  reset(){
    this.productForm = new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      price:new FormControl(null,[Validators.required,Validators.min(0)]),
      image:new FormControl('cloud-upload.jpg'),
      category:new FormGroup({
        id: new FormControl(null,Validators.required),
        name: new FormControl(null)
      }),
      createDate:new FormControl(this.datepipe.transform(new Date(),'yyyy-MM-dd')),
      available:new FormControl('',Validators.required),
      id:new FormControl(null)
    })
    this.productForm.get('category')!.setValue(this.cateGory[0]);
    this.disabled = false;
  }

  validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

  //getter for productForm properties
  get name(){return this.productForm.get('name');}
  get price(){return this.productForm.get('price');}
  get available(){return this.productForm.get('available');}
  get categoryId(){return this.productForm.get('category')?.get('id');}
}
