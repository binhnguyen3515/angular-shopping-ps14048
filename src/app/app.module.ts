import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './component_home/menu/menu.component';
import { HomeComponent } from './component_home/home/home.component';
import { AdminComponent } from './component_admin/admin/admin.component';
import { HeaderComponent } from './component_home/header/header.component';
import { FooterComponent } from './component_home/footer/footer.component';
import { CartInfoComponent } from './component_home/cart-Info/cart-Info.component';
import { CategoryComponent } from './component_home/category/category.component';
import { ProductComponent } from './component_home/home/product/product.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import { SortComponent } from './component_home/sort/sort.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DetailProductComponent } from './component_home/home/detailProduct/detailProduct.component';
import { CartComponent } from './component_home/home/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [	
    AppComponent,
    NotFoundComponent,
    // HomeComponent
    // HomeComponent, 
    // MenuComponent,
    // HeaderComponent,
    // FooterComponent,
    // CartInfoComponent,
    // CategoryComponent,
    // ProductComponent,
    // SortComponent,
    // DetailProductComponent,
    // CartComponent,
    //AdminComponent
    // AdminComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    //Angular MaterialModule
    MatPaginatorModule,
    //I18N
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),//nếu dùng lazy loading thì forChild, hoặc trong module quant lý ladylove, import TranslateModule vào
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
