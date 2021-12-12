import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('selectForm') selectForm!:ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit() {
  }
  onSelectedIndex(){
    let el: HTMLElement = this.selectForm.nativeElement;
    el.click();
  }
}
