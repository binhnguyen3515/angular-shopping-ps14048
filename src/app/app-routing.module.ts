import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/product', pathMatch: 'full' },
  { path: 'home', loadChildren:()=>import('./component_home/home/home.module').then((m)=>m.HomeModule)
  },
  { path: 'admin', loadChildren:()=>import('./component_admin/admin/admin.module').then((m)=>m.AdminModule),canActivate:[AdminGuard]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
