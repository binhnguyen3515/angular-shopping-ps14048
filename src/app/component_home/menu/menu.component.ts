import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/guards/auth.service';
import { TokenStorageService } from 'src/app/guards/tokenStorage.service';
import { SharedDataService } from 'src/app/services/sharedData.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit ,OnDestroy {
  showUsername = "You";
  showUser$:any;
  constructor(private translate:TranslateService,private auth:AuthService,private route:Router,
    private tokenStorage:TokenStorageService,
    private sharedData:SharedDataService) {
    translate.addLangs(['en','vi'])
    translate.setDefaultLang('vi');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|vi/)?browserLang:'vi');
  }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.showUsername = this.tokenStorage.getUser().username;
    }else{
      this.sharedData.currentData.subscribe(data=>this.showUsername = data);
    }
    
  }
  picklanguage(lang:string){
    this.translate.use(lang);
    console.log('lang:'+lang);
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['home/login']);
    this.sharedData.changeData("You");
    this.showUsername = "You";
  }

  ngOnDestroy(): void {

  }
}
