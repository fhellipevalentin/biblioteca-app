import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '@core/constants/app.constants';
import { environment } from '@env/environment';
import { LoginData } from '@core/models/logindata.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  validateLoginDetails(loginData: LoginData) {
    window.sessionStorage.setItem('userdetails', JSON.stringify(loginData));
    return this.http.get(environment.rooturl + AppConstants.LOGIN_API_URL, { observe: 'response', withCredentials: true });
  }

}
