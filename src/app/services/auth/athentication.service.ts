import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Response } from '../../schemas/authentication';

import { urls } from 'src/app/environment/Urls';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AthenticationService {
  constructor(private http: HttpClient) {}

  private signup_url: string = urls.host + urls.signup;
  private login_url: string = urls.host + urls.login;

  signupService(user: User): Observable<Response> {
    return this.http.post<Response>(this.signup_url, user, httpOptions);
  }

  loginService(user: User): Observable<Response> {
    return this.http.post<Response>(this.login_url, user, httpOptions);
  }
}
