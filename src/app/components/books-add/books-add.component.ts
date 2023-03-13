import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/model/author.model';
import { Book } from 'src/app/model/books.model';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {

  
  formulary!: FormGroup;
  booksList: Book[] = [];
  authorList: any = []
  columns: string[] = [ 'id', 'title', 'author', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'options']
  
  constructor( private bookService: BooksService, private authorService: AuthorService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.showData();
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
  submit() {
    const formValues = this.formulary.value 
    const books: Book = new Book(formValues.id, formValues.title, formValues.collection, formValues.quantity, formValues.publicationDate, formValues.manufacturingDate, formValues.author);
    this.bookService.insertBook(books).subscribe(response => {
      let list: Book[] = [...this.booksList, response]
        this.booksList = list
      this.snackBar.open('O livro foi adicionado', 'Sucesso!', {
        duration: 2000
      })
      this.formulary.reset();
    })
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((data: {})=> {
      this.authorList = data
    })
  }
}
