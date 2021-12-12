import { RestApiService } from './../../../../services/rest-api.service';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { delay } from 'rxjs/operators';
import { SharedAccountService } from 'src/app/services/sharedAccount.service';
import { AuthService } from 'src/app/guards/auth.service';
import { data } from 'jquery';
import { AccountRequest } from 'src/app/common/AccountRequest';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-accTable',
  templateUrl: './accTable.component.html',
  styleUrls: ['./accTable.component.css']
})
export class AccTableComponent implements OnInit,OnDestroy,AfterViewInit {
  accounts!:AccountRequest[];
  createAccount$:any;
  updateAccount$:any;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) datatableElement!: DataTableDirective;
  constructor(private sharedData:SharedAccountService,
    private auth:AuthService,private chRef:ChangeDetectorRef) {
    
  }
  ngAfterViewInit(): void {
    // this.dtTrigger.next();
  }

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
    // load account list
    // this.rest.get(this.rest.baseUrl+"rest/auth/getAll").pipe(delay(15)).subscribe(data=>{
    //   this.accounts = data as Account[];
    //   this.dtTrigger.next();
    // })

    this.auth.getAll().pipe(delay(15)).subscribe(data=>{
      this.accounts = data as AccountRequest[];
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
   
     //update table after update account
     this.updateAccount$=this.sharedData.currentUpdateAccountValue.subscribe(data=>{
      if(data !== 'no item') {
        const index = this.accounts.findIndex(a=>a.username==data.username)
        this.accounts[index] = data as AccountRequest;
        this.rerenderDataTable();
      }
    })
    //update table after create account
    this.createAccount$=this.sharedData.currentCreateAccountValue.subscribe(data=>{
      if(data !== 'no item') {
        this.accounts.push(data as AccountRequest)
        this.rerenderDataTable();
      }
    })
 
  }
  edit(account:AccountRequest){
    this.sharedData._passUsernameToAccountForm(account.username);
    this.selectTabIndex.emit();
  }
  rerenderDataTable(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
      this.sharedData._passUpdateAccountValue('no item');
      this.sharedData._passCreateAccountValue('no item');
      
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.updateAccount$.unsubscribe();
    this.createAccount$.unsubscribe();
  }
}
