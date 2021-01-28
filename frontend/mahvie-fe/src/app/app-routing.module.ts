import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '@core/components/about-us/about-us.component';
import { ClientDashboardComponent } from '@core/components/clientdashboard/clientdashboard.component';
import { HomeComponent } from '@core/components/home/home.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'questionnaire',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
