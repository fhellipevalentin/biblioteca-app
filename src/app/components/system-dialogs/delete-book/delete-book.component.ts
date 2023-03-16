import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Book } from 'src/app/model/books.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  constructor( 
    public dialogRef:MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public book:Book,
    public bookService: BooksService,
    private snackBar: MatSnackBar
    ) { }
  
  ngOnInit(): void {
    
  }
  close() {
    this.dialogRef.close();
  }

  deleteData(id:any) {
      this.bookService.deleteBookById(id).subscribe(()=>{
        this.dialogRef.close();
      })
      this.snackBar.open('The Employee has been deleted', 'Success!', {
        duration: 2000
      })
  }

}
