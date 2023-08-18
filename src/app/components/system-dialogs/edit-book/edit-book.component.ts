import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/model/books.model';
import { BooksService } from 'src/app/services/books.service';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Authors } from 'src/app/model/author.model';
import { Genre } from 'src/app/model/genres.model';
import { AuthorService } from '../../../services/author.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  public formulary = this.buildForm()
  authorControl: FormControl = new FormControl('');
  genreControl: FormControl = new FormControl('');
  authorList: any = []
  genreList: any = []

  constructor(
    public dialogRef:MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public book:Book,
    public bookService: BooksService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    this.showData();
    setTimeout(() => {
      return this.formulary.patchValue({
        id: this.book.id,
        title: this.book.title,
        quantity: this.book.quantity,
        collection: this.book.collection,
        manufacturingDate: this.book.manufacturingDate,
        publicationDate: this.book.publicationDate,
        genres: this.book.genres.map(genres => ({ id: genres.id, name: genres.name })),
        authors: this.book.authors.map(authors => ({ id: authors.id, name: authors.name }))
      });
  });
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((data) => {
      this.authorList = data
    })
    this.genreService.listDataGenres().subscribe((data) => {
      this.genreList = data
    })
  }

  submit() {
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
    );
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
      genres: this.formBuilder.array<Genre>([]),
    })
  }

  get authorsFormArray() {
    return this.formulary.controls["authors"] as FormArray;
  }

  buildAuthorForm(): FormGroup {
    return this.formBuilder.group({
      id: [null, Validators.required], // Deixe o ID vazio para que ele possa ser preenchido posteriormente
      name: ['', Validators.required]
    });
  }

  addAuthor() {
    const authorForm = this.buildAuthorForm();
    this.authorsFormArray.push(authorForm);
  }

  deleteAuthor(authorIndex: number) {
    this.authorsFormArray.removeAt(authorIndex)
  }

  get genresFormArray() {
    return this.formulary.controls["genres"] as FormArray;
  }

  buildGenreForm() {
    return this.formBuilder.group({
      id: [this.genreControl.value, Validators.required],
      name: ['', Validators.required]
    });
  }

  addGenre() {
    const genreForm = this.buildGenreForm()
    this.genresFormArray.push(genreForm);
  }

  getAuthorName(authorId: number): string {
    console.log(authorId)
    const author = this.authorList.find(author => author.id === authorId);
    console.log(author)
    return author ? author.name : '';
  }

  deleteGenre(genreIndex: number) {
    this.genresFormArray.removeAt(genreIndex);
  }

  close() {
    this.dialogRef.close();
  }
}
