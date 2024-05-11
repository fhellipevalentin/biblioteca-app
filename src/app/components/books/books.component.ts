import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/model/user.model';
import { BooksService } from 'src/app/services/books.service';

import { AddBookComponent } from '../system-dialogs/add-book/add-book.component';
import { DeleteBookComponent } from '../system-dialogs/delete-book/delete-book.component';
import { Book } from './../../model/books.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public book: Book;

  user = new User();
  formulary!: FormGroup;
  booksList: Book[] = [];
  columns: string[] = [ 'id', 'title', 'authors', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'options']

  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  ordem = "title";
  direcao = "ASC";
  pageSizeOptions: number[] = [5];
  searchText = '';

  constructor( private bookService: BooksService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showData(this.pagina, this.tamanho)
    this.formulary = this.formBuilder.group( {
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      collection: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      manufacturingDate: new FormControl('', Validators.required),
      authors: new FormControl('', Validators.required)
    })
  }

  showData(pagina=0, tamanho=5) {
    this.bookService.listDataPaginada(pagina, tamanho).subscribe(data => {
      this.booksList = data.content
      this.totalElementos = data.totalElements;
      this.pagina = data.number;
    })
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.showData(this.pagina, this.tamanho)
  }

  openDialogDeleteBook(book: Book) {
    this.dialog.open(DeleteBookComponent, {
      width: '300px',
      data: book,
    });
  }

  openDialogAddBook() {
    this.dialog.open(AddBookComponent, {
      width: '485px',
      height: '800px'
    });
  }
}
