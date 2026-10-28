import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BooksComponent } from './pages/books/books.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';

@NgModule({
  declarations: [
    BooksComponent,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    AddAuthorComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BooksComponent,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    AddAuthorComponent
  ]
})
export class BooksModule { }
