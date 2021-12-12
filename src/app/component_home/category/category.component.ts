import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SharedCateService } from 'src/app/services/sharedCate.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  cates:Category[] = [];
  url = this.rest.baseUrl+'rest/categories';
  constructor(private rest:RestApiService,private data:SharedCateService,private router:Router) { }

  selectedCate!:string;

  ngOnInit() {
    this.rest.get(this.url).subscribe((data)=>{
      // console.log(data);
      this.cates = data as Category[];
    })
    this.data.currentData.subscribe(data => this.selectedCate = data);
  }
 
  selectCateId(cid:string){
    this.data.changeData(cid);
    this.router.navigate(['/home/product',{cid:cid}]);
  }
}
