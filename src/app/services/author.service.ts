import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Errors } from '../errors/Errors';
import { Authors } from '../model/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  URLBase: string = environment.rooturl
  private errorHandle : Errors = new Errors();

  constructor( private http: HttpClient) { }

  listDataAuthors()  {
    return this.http.get<Authors[]>(`${this.URLBase}/api/authors/all`)
    .pipe (
      retry(1),
      catchError(this.errorHandle.appError)
    )
  }
}
