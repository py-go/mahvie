import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlertboxComponent } from './components/alertbox/alertbox.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AlertboxComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports:[
    AlertboxComponent,
    LoaderComponent,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class SharedModule { }
