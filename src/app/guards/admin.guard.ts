import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService,private message:AlertService,
    private location:Location,private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.auth.isAdminOrStaff()){
        this.message.warningMessage("You don't have permission to enter this page!");
        this.route.navigate(['/home/login']);
      }
    return this.auth.isAdminOrStaff();
  }
  
}
