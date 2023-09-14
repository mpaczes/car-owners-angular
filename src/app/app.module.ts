import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from '../error_pages/page-not-found/page-not-found.component';
import { CheckContentTypeInterceptor } from 'src/app/interceptors/check-content-type.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	CommonModule,
	FormsModule,
	RouterModule,
	HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: CheckContentTypeInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
