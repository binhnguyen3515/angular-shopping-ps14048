import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { homeRoutes } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartInfoComponent } from '../cart-Info/cart-Info.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from './product/product.component';
import { SortComponent } from '../sort/sort.component';
import { DetailProductComponent } from './detailProduct/detailProduct.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { YourOrdersComponent } from './yourOrders/yourOrders.component';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    CartInfoComponent,
    CategoryComponent,
    ProductComponent,
    SortComponent,
    DetailProductComponent,
    CartComponent,
    LoginComponent,
    OrderInfoComponent,
    YourOrdersComponent,
  ],
})
export class HomeModule { }
