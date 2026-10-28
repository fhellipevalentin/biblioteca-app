import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@features/auth/auth.module';
import { HomeModule } from '@features/home/home.module';
import { DashboardModule } from '@features/dashboard/dashboard.module';
import { BooksModule } from '@features/books/books.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    HomeModule,
    DashboardModule,
    BooksModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
