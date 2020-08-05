import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './products/list/list.component';
import { CategoryListComponent } from './category/list/list.component';
import { AddCategoryComponent } from './category/add/add.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { AddusersComponent } from './users/addusers/addusers.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { ProductDetailsComponent } from './products/details/details.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/list', component: ListComponent },
  { path: 'category/list', component: CategoryListComponent },
  { path: 'category/add', component: AddCategoryComponent },
  { path: 'customer/details/:id', component: UserdetailsComponent },
  { path: 'customers/list', component: UserslistComponent },
  { path: 'customers/add', component: AddusersComponent },
  { path: 'products/details/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
