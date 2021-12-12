import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAccountGuard } from 'src/app/guards/admin-account.guard';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { ProductComponent } from './product/product.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path:'',redirectTo: 'summary',pathMatch:'full'},
  {path:'',component:AdminComponent,children:[
    {path:'summary',component:SummaryComponent},
    {path:'product',component:ProductComponent},
    {path:'account',component:AccountComponent,canActivate:[AdminAccountGuard]},
    {path:'authorize',component:AuthorizeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
