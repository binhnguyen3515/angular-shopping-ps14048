import { Component, OnInit } from '@angular/core';
import {GlobalVariable} from 'src/app/common/globalVariable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerImageUrl = GlobalVariable.baseHeaderImageUrl
  constructor() { }

  ngOnInit() {
  }

}
