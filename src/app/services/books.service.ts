import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../model/books.model';
import { Errors } from '../errors/Errors';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  URLbase : string = environment.rooturl;
  private errorHandle : Errors = new Errors();

  constructor( private http: HttpClient) { 
  }

  authorizationAccess = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listDataPaginada(page: number, linesPerPage: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', linesPerPage)
    return this.http.get<any> (`${this.URLbase}/api/book/all?${params.toString()}`)
    .pipe (
      retry(1),
      catchError(this.errorHandle.appError)
    )
  }

  deleteBookById(id: any) {
    return this.http.delete<Book>(`${this.URLbase}/api/book/${id}`, this.authorizationAccess)
    .pipe(
      retry(1),
      catchError(this.errorHandle.appError)
    )
  }

  insertBook(newData: any): Observable<Book> {
    return this.http.post<Book>(`${this.URLbase}/api/book/add`, newData)
    .pipe(
      retry(1),
      catchError(this.errorHandle.appError)
    )
  }

}
