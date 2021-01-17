import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { QuestionnaireModule } from '@questionnaire/questionnaire.module';

const routes: Routes = [
  { path: '', component: LayoutComponent },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    QuestionnaireModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
