import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { RegistrationInfo } from './registration-info';

const httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*',
                               'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private loginUrl = 'http://localhost:1000/api/login';
    private registrationUrl = 'http://localhost:1000/api/register';

  constructor(private http: HttpClient) { }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    }

    signUp(info: RegistrationInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.registrationUrl, info, httpOptions);
    }
}