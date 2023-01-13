import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './admin-dashboard/add/add.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditComponent } from './admin-dashboard/edit/edit.component';

import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './services/admin.guard';
import { CustomerGuard } from './services/customer.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'customer-dashboard',
    component: CustomerDashboardComponent,
    canActivate: [CustomerGuard],
  },
  { path: 'add', component: AddComponent },
  { path: 'edit/:loanNo', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
