import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class SharedCateService {
    private sharedData = new BehaviorSubject<string>('default message');
    currentData = this.sharedData.asObservable();
    constructor() {}
  
    changeData(data: string) {
      this.sharedData.next(data);
    }
  }
