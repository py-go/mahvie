import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ClientdashboardComponent } from './components/clientdashboard/clientdashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    AlertboxComponent,
    LoaderComponent,
    ClientdashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HomeComponent,
    AboutUsComponent,
    AlertboxComponent,
    LoaderComponent,
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
