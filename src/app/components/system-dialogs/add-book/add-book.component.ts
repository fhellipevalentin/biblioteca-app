import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authors } from 'src/app/model/author.model';
import { Book } from 'src/app/model/books.model';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public formulary = this.buildForm()
  authorList: any = []
  genreList: any = []
  genreControl: FormControl = new FormControl('');
  authorControl: FormControl = new FormControl('');

  constructor(
    private bookService: BooksService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef:MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public book:Book
    ) { }


  ngOnInit(): void {
    this.showData()
    this.formulary.valueChanges.subscribe(res => console.log(res))
  }

  buildForm() {
    return this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      collection: ['', Validators.required],
      quantity: ['', Validators.required],
      publicationDate: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      authors: this.formBuilder.array<Authors>([]),
      genre1: ['', Validators.required],
      genre2: ['', Validators.required],
      genre3: ['', Validators.required]
      })
  }

  submit() {
    if (this.formulary.valid) {
      this.bookService.insertBook(this.formulary.value).subscribe(data => {
        this.snackBar.open('Livro adicionado com sucesso', 'Fechar', {
          duration: 5000
        });
        this.close()
        console.log(data)
      })
    } else {
      this.formulary.markAllAsTouched();
    }
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((data: {})=> {
      this.authorList = data
      console.log(data)
    })
  }

  get authorsFormArray() {
    return this.formulary.controls["authors"] as FormArray;
  }

  addAuthor() {
    const authorForm = this.formBuilder.group({
      id: [this.authorControl.value, Validators.required],
      name: ['', Validators.required]
    });
    this.authorsFormArray.push(authorForm)
  }

  deleteAuthor(authorIndex: number) {
    this.authorsFormArray.removeAt(authorIndex)
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

  close() {
    this.dialogRef.close();
  }

}
