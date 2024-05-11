import { Book } from './../../model/books.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Authors } from 'src/app/model/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book!: Book;
  feedback: any = {};


  constructor(
    public bookService: BooksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Book());
        }
        return this.bookService.accessBookById(id);
      })
    ).subscribe({
      next: book => {
        this.book = book;
        this.feedback = {};
      },
      error: () => {
        this.feedback = {type: 'warning', message: 'Error loading'};
      }

    });
  }

  submit() {
    /*
    this.bookService.editBook(this.book.id, this.formulary.value).subscribe(
      () => {
        this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.dialogRef.close(); // Feche o diálogo após a atualização
      },
      (error) => {
        console.error('Erro ao atualizar o livro:', error);
        this.snackBar.open('Erro ao atualizar o livro.', 'Fechar', {
          duration: 3000,
        });
        this.close();
      }
    );*/
  }

  deleteAuthor(authorIndex: number) {

  }

}
