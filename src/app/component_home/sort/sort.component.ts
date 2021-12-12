import { Component, OnInit } from '@angular/core';
import { SharedProductService } from 'src/app/services/sharedProduct.service';
@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  sort!:string;
  constructor(private data:SharedProductService) { }

  ngOnInit() {
    this.data.currentData.subscribe(data => this.sort = data);
  }
  sendMessage(sortType:string){
    this.data.changeData(sortType);
  }
}
