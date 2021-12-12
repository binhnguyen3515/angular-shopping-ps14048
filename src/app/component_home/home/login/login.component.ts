import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { TokenStorageService } from 'src/app/guards/tokenStorage.service';
import { AlertService } from 'src/app/services/alert.service';
import { SharedDataService } from 'src/app/services/sharedData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  });
  roles:string[]=[];
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private auth:AuthService,
    private tokenStorage:TokenStorageService,
    private route:Router,
    private message:AlertService,private location :Location,private sharedData:SharedDataService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        data=>{
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          console.log(this.roles);
          
          this.message.successMessage(`Welcome back: ${data.username}`);
          this.changeUsername();
          
          this.location.back();
        },
        err=>{
          this.message.errorMessage(err.error.message);
          this.isLoginFailed = true;
        }
      )
    }
  }
  changeUsername(){
    if(this.tokenStorage.getUser()){
      this.sharedData.changeData(this.tokenStorage.getUser().username);
    }
  }

}
