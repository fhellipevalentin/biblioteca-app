import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Book } from 'src/app/model/books.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  formulary!: FormGroup;
  booksList: Book[] = [];
  columns: string[] = [ 'id', 'title', 'author', 'collection', 'quantity', 'publicationDate', 'manufacturingDate']

  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  ordem = "title";
  direcao = "ASC";
  pageSizeOptions: number[] = [5];
  searchText = '';

  constructor( private bookService: BooksService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.showData(this.pagina, this.tamanho)
    this.formulary = this.formBuilder.group( {
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      collection: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      manufacturingDate: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
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

}
