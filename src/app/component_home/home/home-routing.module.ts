import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartInfoComponent } from '../cart-Info/cart-Info.component';
import { CategoryComponent } from '../category/category.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { SortComponent } from '../sort/sort.component';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detailProduct/detailProduct.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';
import { ProductComponent } from './product/product.component';
import { YourOrdersComponent } from './yourOrders/yourOrders.component';

export const homeRoutes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'detail/:id',component: DetailProductComponent},
    {path:'product',component: ProductComponent,},
    {path:'cart',component: CartComponent,},
    {path:'login',component: LoginComponent},
    {path:'orders',component: YourOrdersComponent},
    {path:'orderInfo',component: OrderInfoComponent},
    ]
  }
];

