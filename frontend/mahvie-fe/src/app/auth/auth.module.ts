import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { LoginGuard } from '@core/guards/login.guard';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    RegisterationComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
