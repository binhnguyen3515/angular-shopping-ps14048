import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccFormComponent } from './accForm/accForm.component';
import { AccTableComponent } from './accTable/accTable.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('selectForm') selectForm!:ElementRef<HTMLElement>;
  @ViewChild(AccFormComponent,{static:false})formTable!:AccFormComponent;
  constructor() { }

  ngOnInit() {
  }
  onSelectedIndex(){
    let el: HTMLElement = this.selectForm.nativeElement;
    el.click();
    this.formTable.reset();
  }
}
