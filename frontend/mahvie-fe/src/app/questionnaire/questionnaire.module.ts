import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    QuestionnaireComponent,
  ],
})
export class QuestionnaireModule {}
