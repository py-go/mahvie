import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SharedModule } from '@shared/shared.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    QuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    QuestionnaireComponent,
  ],
})
export class QuestionnaireModule {}
