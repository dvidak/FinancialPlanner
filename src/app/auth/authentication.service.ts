import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { RegistrationInfo } from './registration-info';

export const TOKEN_NAME: string = 'token';
export const USERNAME_KEY = 'AuthUsername';
export const AUTHORITIES_KEY = 'AuthAuthorities';
export const USER_ID = 'AuthUserID'


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

    getToken(): string {
      return localStorage.getItem(TOKEN_NAME);
    }
    
    setToken(token: string): void {
      localStorage.setItem(TOKEN_NAME, token);
    }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    }

    isLoggedin() {
      return localStorage.getItem(TOKEN_NAME) !==  null;
    } 

    signUp(info: RegistrationInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.registrationUrl, info, httpOptions);
    }

    signOut() {
      localStorage.removeItem(TOKEN_NAME);
      console.log(localStorage.getItem(TOKEN_NAME));
    }

    saveUsername(username: string) {
      window.sessionStorage.removeItem(USERNAME_KEY);
      window.sessionStorage.setItem(USERNAME_KEY, username);
    }

    getUsername(): string {
      return sessionStorage.getItem(USERNAME_KEY);
    }

    saveUserID(id: string){
      window.sessionStorage.removeItem(USER_ID);
      window.sessionStorage.setItem(USER_ID, id);
    }

    getUserID(){
      return sessionStorage.getItem(USER_ID);
    }



}