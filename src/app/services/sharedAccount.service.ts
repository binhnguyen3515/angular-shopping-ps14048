import { Account } from 'src/app/models/Account';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountRequest } from '../common/AccountRequest';

@Injectable({
  providedIn: 'root',
})
export class SharedAccountService {
  
  constructor() {}

  private passUsernameToAccountForm = new BehaviorSubject<string>('no item');
  currentUsername = this.passUsernameToAccountForm.asObservable();

  private passUpdateAccountValue = new BehaviorSubject<any>('no item');
  currentUpdateAccountValue = this.passUpdateAccountValue.asObservable();

  private passCreateAccountValue = new BehaviorSubject<any>('no item');
  currentCreateAccountValue = this.passCreateAccountValue.asObservable(); 

  _passUsernameToAccountForm(username: string) {
    this.passUsernameToAccountForm.next(username);
  }

  _passUpdateAccountValue(data:any){
    this.passUpdateAccountValue.next(data);
  }

  _passCreateAccountValue(data: any) {
    this.passCreateAccountValue.next(data);
  }
}
