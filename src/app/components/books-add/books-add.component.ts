import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { GenreService } from 'src/app/services/genre.service';
import { MatDialog } from '@angular/material/dialog';
import { Genre } from 'src/app/model/genres.model';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {

  public formulary = this.buildForm()
  authorList: any = []
  genreList: any = []
  genreControl: FormControl = new FormControl('');

  columns: string[] = [ 'id', 'title', 'author', 'collection', 'quantity', 'publicationDate', 'manufacturingDate', 'genres', 'options']

  constructor(
    private bookService: BooksService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private genreService: GenreService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.showData()
    //this.formulary.valueChanges.subscribe(res => console.log(res))
    this.genresFormArray.valueChanges.subscribe(console.log)
  }

  buildForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      collection: ['', Validators.required],
      quantity: ['', Validators.required],
      publicationDate: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      author: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
      }),
      genres: this.formBuilder.array<Genre>([]),
      })
  }

  buildFormGroupGender() {
    const genreForm = this.formBuilder.group({
      id: [this.genreControl.value, Validators.required],
      name: ['', Validators.required]
    });

  }

  submit() {
    const dados = JSON.stringify(this.formulary.value);
    console.log(this.formulary.value);
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

  get genresFormArray() {
    return this.formulary.controls["genres"] as FormArray;
  }

  addGenre() {
    const genreForm = this.formBuilder.group({
      id: [this.genreControl.value, Validators.required],
      name: ['', Validators.required]
    });
    this.genresFormArray.push(genreForm);
  }

  deleteGenre(genreIndex: number) {
    this.genresFormArray.removeAt(genreIndex);
  }

}
