import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { RegistrationInfo } from './registration-info';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'token';

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
    

    constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) { }

    getToken(): string {
      return localStorage.getItem(TOKEN_NAME);
    }
    
    setToken(token: string): void {
      localStorage.setItem(TOKEN_NAME, token);
    }

    getTokenExpirationDate(token: string): Date {
      const decoded = jwt_decode(token);
  
      if (decoded.exp === undefined) return null;
  
      const date = new Date(0); 
      date.setUTCSeconds(decoded.exp);
      return date;
    }

    isTokenExpired(token?: string): boolean {
      console.log("Ušao u token expired")
      if(!token) token = this.getToken();
      console.log("imamo li token");
      console.log(token);
      if(!token) return true;
      console.log("nakon geta");
      console.log(token);
      const date = this.getTokenExpirationDate(token);
      if(date === undefined) return false;
      return !(date.valueOf() > new Date().valueOf());
    }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    }

    signUp(info: RegistrationInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.registrationUrl, info, httpOptions);
    }
}