import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    QuestionnaireComponent,
  ],
})
export class QuestionnaireModule {}
