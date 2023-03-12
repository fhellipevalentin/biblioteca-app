import { HttpClient, HttpParams } from '@angular/common/http';
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
}
