import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '@core/models/books.model';
import { Authors } from '@core/models/author.model';
import { AuthorService } from '@core/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  authorSelected: Authors;
  authorList!: Authors[];

  constructor(
    public dialogRef: MatDialogRef<AddAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    public authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.authorService.listDataAuthors().subscribe((dataAuthors) => {
      this.authorList = dataAuthors;
    });
    console.log(this.book);
  }

  onNoClick(): void {
    console.log(this.authorSelected);
    this.addAuthor(this.authorSelected);
    this.dialogRef.close();
  }

  addAuthor(obj: Authors) {
    this.book.authors.push(new Authors({ id: obj.id, name: obj.name }));
  }

}
