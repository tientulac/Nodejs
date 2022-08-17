import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../commons/data-table/data-table.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../portals/portal-admin/dashboard/dashboard.component';
import { ManagementPageComponent } from '../portals/portal-admin/management-page/management-page.component';
import { NonAuthGuard } from '../utils/guards/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: LoginComponent, 
    data: { preload: true },
    children: [
    ]
  },
  {
    path: 'admin',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: ManagementPageComponent, 
    data: { preload: true },
    children: [
      {
        path: 'hanttech',
        component: DashboardComponent, 
      },
      {
        path: 'builder',
        component: DataTableComponent, 
      },
      {
        path: 'data-table',
        component: DataTableComponent, 
      },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
