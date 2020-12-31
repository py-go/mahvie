import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [AlertboxComponent, LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports:[
    AlertboxComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
