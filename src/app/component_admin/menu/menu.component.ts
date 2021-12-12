import { SharedDataService } from 'src/app/services/sharedData.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth:AuthService,private route:Router,private sharedData:SharedDataService) { }

  hideLink=false;
  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.hideLink = true;
    }else{
      this.hideLink = false;
    }
    
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['home/login']);
    this.sharedData.changeData("You");
  }

}
