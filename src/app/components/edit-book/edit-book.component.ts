import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Authors } from 'src/app/model/author.model';
import { BooksService } from 'src/app/services/books.service';

import { AddAuthorComponent } from '../system-dialogs/add-author/add-author.component';
import { Book } from './../../model/books.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book!: Book;
  feedback: any = {};
  authors!: Authors;


  constructor(
    public bookService: BooksService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    this.book = new Book();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        return this.bookService.accessBookById(id);
      })
    ).subscribe({
      next: book => {
        this.book = book;
      }
    });
  }

  submit() {

    this.bookService.editBook(this.book.id, this.book).subscribe(
      () => {
        this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      this.router.navigate(['books'])
      console.log(this.book)
      },
      (error) => {
        console.error('Erro ao atualizar o livro:', error);
        this.snackBar.open('Erro ao atualizar o livro.', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  addAuthor() {
    this.book.authors.push(new Authors());
  }

  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(AddAuthorComponent, {
      width: '250px',
      data: book,
    });
  }

  removeAuthor(index: number) {
    this.book.authors.splice(index, 1);
  }

}
