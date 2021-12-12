import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from './auth.service';
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class AdminAccountGuard implements CanActivate {
  constructor(private auth:AuthService, private message:AlertService,private location:Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.isDirector()){
        this.message.warningMessage("You need admin role to enter this page!");
      }
    return this.auth.isDirector();
  }
  
}
