import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/model/books.model';

import { AuthorService } from '../../../services/author.service';
import { Authors } from './../../../model/author.model';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  authorSelected: string;

  constructor(
    public dialogRef: MatDialogRef<AddAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    public authorService: AuthorService
  ) {

  }

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((dataAuthors) => {
      this.authorList = dataAuthors;
    });
    console.log(this.book);
  }

  authorList!: Authors[];

  onNoClick(): void {
    console.log(this.authorSelected)
    this.addAuthor(this.authorSelected)
    this.dialogRef.close();

  }

  addAuthor(author: string) {
    this.book.authors.push(new Authors({id: null, name: author}));
  }

}
