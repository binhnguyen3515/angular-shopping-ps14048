import { Component, OnInit } from '@angular/core';
import {GlobalVariable} from 'src/app/common/globalVariable';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AuthService } from 'src/app/guards/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { AccountRequest } from 'src/app/common/AccountRequest';
import { SharedAccountService } from 'src/app/services/sharedAccount.service';
@Component({
  selector: 'app-accForm',
  templateUrl: './accForm.component.html',
  styleUrls: ['./accForm.component.css']
})
export class AccFormComponent implements OnInit {
  baseHostAvatarUrl = '';
  selectedFiles?:FileList;
  currentFile?:File;
  ROLE = ['Staffs','Directors','Customers']
  selectedRole:string[] = []
  disabled = false;
  accForm = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email,Validators.maxLength(50)]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    fullname:['',[Validators.required,Validators.minLength(3)]],
    photo:['user.png'],
    role:this.fb.array(this.selectedRole,Validators.required)
  })
  constructor(private fb:FormBuilder,
    private uploadService:FileUploadService,private auth:AuthService,
    private message:AlertService,private sharedData:SharedAccountService) { 
    this.baseHostAvatarUrl = GlobalVariable.baseHostAvatarUrl;
  }
  
  ngOnInit() {
    
    this.sharedData.currentUsername.subscribe(username=>{
      if(username !=='no item'){
        this.auth.accountRequestByUsername(username).subscribe(data=>{
          this.role.reset();
          let requestAccount:AccountRequest = data as AccountRequest;
          this.accForm.patchValue(data as AccountRequest);
          this.selectedRole = requestAccount.role
          requestAccount.role.forEach(role=>{
            this.addRole(role)
          })
          this.disabled = true;
        },error=>{
          this.message.errorMessage(error.error.message)
        })
      }else{
        this.disabled = false;
      }
    })
  }

  selectFile(event:any){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file:File | null = this.selectedFiles.item(0);
      // console.log("file:"+file?.name);
      if(file){
        this.currentFile = file;
        this.uploadService.upload(this.currentFile,"avatar").subscribe(data=>{
          this.photo?.setValue(data.name);
        },err=>{
          console.log("err: "+err);
        })
        this.selectedFiles = undefined;
      }
    }
  }

  // use authService register method to create account
  create(){
    // console.log(this.accForm.value);
    if(this.accForm.valid){
      this.auth.register(this.accForm.value).subscribe(data=>{
        this.message.successMessage("Account created successfully!");
        this.sharedData._passCreateAccountValue(this.accForm.value);
        this.reset();
      },err=>{
        this.message.errorMessage(err.error.message)
      })
    }else{
      this.validateAllFormFields(this.accForm)
    }
  }

  update(){
    // console.log(this.accForm.value);
    if(this.accForm.valid){
      this.auth.update(this.accForm.value).subscribe(data=>{
        // console.log(data);
        this.message.successMessage("Account updated successfully!");
        this.sharedData._passUpdateAccountValue(this.accForm.value);
      },err=>{
        this.message.errorMessage(err.message)
      })
    }else{
      this.validateAllFormFields(this.accForm)
    }
  }

  toggleRole(role:string){
    const index = this.selectedRole.indexOf(role);
    // remove role
    if(index > -1){
      this.selectedRole.splice(index,1);
      this.removeRole(role);
    }else{
    // select role
      this.selectedRole.push(role);
      this.addRole(role);
    }
    // console.log(this.selectedRole);
    
  }

  reset(){
    this.selectedRole.length = 0;
    this.role.reset();
    this.accForm = this.fb.group({
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.email,Validators.maxLength(50)]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      fullname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      photo:['user.png'],
      role:this.fb.array(this.selectedRole,Validators.required)
    })
    this.disabled = false;
  }
  get photo(){return this.accForm.get('photo');}
  get role (){return this.accForm.get('role') as FormArray}
  get username(){return this.accForm.get('username');}
  get email(){return this.accForm.get('email');}
  get password(){return this.accForm.get('password');}
  get fullname(){return this.accForm.get('fullname');}

  addRole (role:string){return this.role.push(this.fb.control(role))}
  removeRole (role:string){return this.role.removeAt(this.role.value.findIndex(
    (r: string)=>r === role
  ))}

  validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        // for (const control1 of control.controls) {
        //   if (control1 instanceof FormControl) {
        //     control1.markAsTouched({
        //       onlySelf: true
        //     });
        //   }
        //   if (control1 instanceof FormGroup) {
        //     this.validateAllFormFields(control1);
        //   }
        // }
        control.markAsTouched({
          onlySelf: true
        });
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
