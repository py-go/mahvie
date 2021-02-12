import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directives/number-only/number-only.directive';
<<<<<<< HEAD
import { AlphabetsOnlyDirective } from './directives/alphabets-only/alphabets-only.directive';

@NgModule({
  declarations: [NumberOnlyDirective, AlphabetsOnlyDirective],
=======

@NgModule({
  declarations: [NumberOnlyDirective],
>>>>>>> 3cb4239ec1dd773628697fd0530f0a6692364cb0
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
<<<<<<< HEAD
    NumberOnlyDirective,
    AlphabetsOnlyDirective
=======
    NumberOnlyDirective
>>>>>>> 3cb4239ec1dd773628697fd0530f0a6692364cb0
  ]
})
export class SharedModule { }
