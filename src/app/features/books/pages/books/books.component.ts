import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/models/user.model';
import { Book } from '@core/models/books.model';
import { BooksService } from '@core/services/books.service';
import { AddBookComponent } from '../../components/add-book/add-book.component';
import { DeleteBookComponent } from '../../components/delete-book/delete-book.component';
import { EditBookComponent } from '../../components/edit-book/edit-book.component';

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
  columns: string[] = ['id', 'title', 'authors', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'options'];

  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  ordem = 'title';
  direcao = 'ASC';
  pageSizeOptions: number[] = [5];
  searchText = '';

  expandedElement: any = null;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.showData(this.pagina, this.tamanho);
    this.formulary = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      collection: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      manufacturingDate: new FormControl('', Validators.required),
      authors: new FormControl('', Validators.required)
    });
  }

  showData(pagina = 0, tamanho = 5) {
    this.bookService.listDataPaginada(pagina, tamanho).subscribe(data => {
      this.booksList = data.content;
      this.totalElementos = data.totalElements;
      this.pagina = data.number;
    });
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.showData(this.pagina, this.tamanho);
  }

  openDialogEditBook(book: Book, event?: MouseEvent) {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '560px',
      maxHeight: '90vh',
      hasBackdrop: true,
      data: book,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showData(this.pagina, this.tamanho);
      }
    });
  }

  openDialogDeleteBook(book: Book, event?: MouseEvent) {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '300px',
      hasBackdrop: true,
      data: book,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showData(this.pagina, this.tamanho);
    });
  }

  openDialogAddBook() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '485px',
      height: '800px',
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showData(this.pagina, this.tamanho);
    });
  }
}
