import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../app/core/services/interceptor.service';

import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuestionnaireModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
