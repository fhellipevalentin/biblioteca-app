import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { GenreService } from 'src/app/services/genre.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {

  public formulary: FormGroup = this.formBuilder.group({});
  authorList: any = []
  genreList: any = []
  genreControl: FormControl = new FormControl([]);

  columns: string[] = [ 'id', 'title', 'author', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'genres', 'options']
  
  constructor( private bookService: BooksService, private authorService: AuthorService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private genreService: GenreService, public dialog: MatDialog) { }

  
  ngOnInit(): void {
    this.showData()
    this.formulary = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      collection: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      publicationDate: new FormControl('', Validators.required),
      manufacturingDate: new FormControl('', Validators.required),
      author: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
      }),
      genres: this.formBuilder.array([
        
      ]),
      })
  }

  submit() { 

    const dados = JSON.stringify(this.formulary.value);
    console.log(dados);
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((data: {})=> {
      this.authorList = data
      console.log(data)
    })
    this.genreService.listDataGenres().subscribe((data: {}) => {
      this.genreList = data
      console.log(data)
    })
  }

  get genres() {
    return this.formulary.controls["genres"] as FormArray;
  }

  addGenre() {
    const genreForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.genres.push(genreForm);
    console.log(this.genreControl.value)
  }
  

  deleteGenre(genreIndex: number) {
    this.genres.removeAt(genreIndex);
  }
  
}
