import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Author } from 'src/app/model/author.model';
import { Book } from 'src/app/model/books.model';
import { Genre } from 'src/app/model/genres.model';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {

  public formulary: FormGroup = this.formBuilder.group({});
  authorList: any = []
  genreList: any = []

  checked = false;

  selectedGenres: number[] = [];

  columns: string[] = [ 'id', 'title', 'author', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'genres', 'options']
  
  constructor( private bookService: BooksService, private authorService: AuthorService, private genreService: GenreService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.showData();
    this.formulary = this.formBuilder.group( {
      title: new FormControl('', Validators.required),
      collection: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      manufacturingDate: new FormControl('', Validators.required),
      author: this.formBuilder.group({
        id: [null, Validators.required],
        name: ['']
      }),
      genres: [[], Validators.required],
      })
      
  }

  const book: Book = {
    title: this.formulary.controls['title'].value,
    author: this.formulary.controls['author'].value,
    genres: this.formulary.controls['genres'].value,
  };
  
  submit() { 
    const books: Book = this.formulary.value;
    this.bookService.insertBook(books).subscribe(response => {
      console.log(books)
      this.formulary.reset();
    })
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((data: {})=> {
      this.authorList = data
    })
    this.genreService.listDataGenres().subscribe((data: {}) => {
      this.genreList = data
    })
  }

}
