import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomeComponent,
    AboutUsComponent,
  ]
})
export class CoreModule { }
