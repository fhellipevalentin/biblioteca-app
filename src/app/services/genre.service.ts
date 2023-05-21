import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Errors } from '../errors/Errors';
import { Genre } from '../model/genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  URLBase: string = environment.rooturl
  private errorHandle : Errors = new Errors();

  constructor( private http: HttpClient) { }

  listDataGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.URLBase}/api/genres/all`)
    .pipe (
      retry(1),
      catchError(this.errorHandle.appError)
    )
  }
}