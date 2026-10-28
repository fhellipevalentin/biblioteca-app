import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { environment } from '@env/environment';
import { Errors } from '@core/errors/errors';
import { Authors } from '@core/models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  URLBase: string = environment.rooturl;
  private errorHandle: Errors = new Errors();

  constructor(private http: HttpClient) { }

  listDataAuthors() {
    return this.http.get<Authors[]>(`${this.URLBase}/api/authors/all`)
      .pipe(
        retry(1),
        catchError(this.errorHandle.appError)
      );
  }
}
