import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './products/list/list.component';
import { BrandlistComponent } from './brands/brandlist/brandlist.component';
import { BrandaddComponent } from './brands/brandadd/brandadd.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/list', component: ListComponent },
  { path: 'brands/list', component: BrandlistComponent },
  { path: 'brands/add', component: BrandaddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
