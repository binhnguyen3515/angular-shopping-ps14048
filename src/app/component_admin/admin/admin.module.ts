import { AccFormComponent } from './account/accForm/accForm.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductComponent } from './product/product.component';
import { FormComponent } from './product/form/form.component';
import { TableComponent } from './product/table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { AccTableComponent } from './account/accTable/accTable.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    //Product and its Child Components
    ProductComponent,
    FormComponent,
    TableComponent,
    //Account and its Child Components
    AccountComponent,
    AccFormComponent,
    AccTableComponent,

    SummaryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
