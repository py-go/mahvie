import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'forget', component:ForgetPasswordComponent },
  { path: 'register', component:RegisterationComponent }
];


@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent, RegisterationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
