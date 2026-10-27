import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Authors } from 'src/app/model/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../../../model/books.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book = new Book();
  formulary: FormGroup;
  authorList: Authors[] = [];
  isSaving = false;
  isDialog = false;

  constructor(
    public bookService: BooksService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public router: Router,
    @Optional() public dialogRef: MatDialogRef<EditBookComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: Book
  ) {
    this.isDialog = !!this.dialogRef;
    this.formulary = this.buildForm();
  }

  ngOnInit(): void {
    this.loadAuthors();

    if (this.dialogData && this.dialogData.id) {
      this.populateForm(this.dialogData);
      this.bookService.accessBookById(this.dialogData.id).subscribe({
        next: (freshBook) => {
          if (freshBook) {
            this.populateForm(freshBook);
          }
        }
      });
    } else {
      this.route.params.pipe(
        map(p => p['id']),
        switchMap(id => this.bookService.accessBookById(id))
      ).subscribe({
        next: book => {
          this.populateForm(book);
        }
      });
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      title: ['', Validators.required],
      collection: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(0)]],
      publicationDate: [null, Validators.required],
      manufacturingDate: [null, Validators.required],
      authors: this.formBuilder.array([])
    });
  }

  loadAuthors(): void {
    this.authorService.listDataAuthors().subscribe({
      next: (authors) => {
        this.authorList = authors || [];
      }
    });
  }

  populateForm(book: Book): void {
    this.book = new Book(book);
    this.formulary.patchValue({
      id: book.id,
      title: book.title,
      collection: book.collection,
      quantity: book.quantity,
      publicationDate: book.publicationDate ? new Date(book.publicationDate) : null,
      manufacturingDate: book.manufacturingDate ? new Date(book.manufacturingDate) : null
    });

    this.authorsFormArray.clear();
    if (book.authors && book.authors.length) {
      book.authors.forEach(author => {
        this.authorsFormArray.push(this.createAuthorGroup(author));
      });
    }
  }

  createAuthorGroup(author?: Partial<Authors>): FormGroup {
    return this.formBuilder.group({
      id: [author?.id ?? null, Validators.required],
      name: [author?.name ?? '']
    });
  }

  get authorsFormArray(): FormArray {
    return this.formulary.get('authors') as FormArray;
  }

  addAuthor(): void {
    this.authorsFormArray.push(this.createAuthorGroup());
  }

  removeAuthor(index: number): void {
    this.authorsFormArray.removeAt(index);
  }

  onAuthorSelectionChange(index: number, selectedAuthorId: number): void {
    const found = this.authorList.find(a => a.id === selectedAuthorId);
    if (found) {
      this.authorsFormArray.at(index).patchValue({
        id: found.id,
        name: found.name
      });
    }
  }

  submit(): void {
    if (this.formulary.invalid) {
      this.formulary.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const rawValue = this.formulary.getRawValue();
    const updatedBook: Book = {
      ...this.book,
      ...rawValue,
      id: this.book.id
    };

    this.bookService.editBook(this.book.id, updatedBook).subscribe({
      next: (result) => {
        this.isSaving = false;
        this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        if (this.isDialog) {
          this.dialogRef.close(result || updatedBook);
        } else {
          this.router.navigate(['books']);
        }
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Erro ao atualizar o livro:', error);
        this.snackBar.open('Erro ao atualizar o livro.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }

  close(): void {
    if (this.isDialog) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['books']);
    }
  }

}

