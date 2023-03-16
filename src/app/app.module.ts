import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { LogoutComponent } from './components/logout/logout.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { BooksService } from './services/books.service';
import { DeleteBookComponent } from './components/system-dialogs/delete-book/delete-book.component';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { AuthorService } from './services/author.service';
import { GenreService } from './services/genre.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    DashboardComponent,
    LogoutComponent,
    BooksComponent,
    DeleteBookComponent,
    BooksAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule,
    FormControl,
    
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule
    
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    }, AuthActivateRouteGuard, BooksService, GenreService, AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
