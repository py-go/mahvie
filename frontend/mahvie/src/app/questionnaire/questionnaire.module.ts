import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   { path: '', component:QuestionnaireComponent },
// ];



@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes)
  ],
  exports:[
    QuestionnaireComponent
  ]
})
export class QuestionnaireModule { }
