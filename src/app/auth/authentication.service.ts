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
export const ROLE_ID = 'AuthUserRoleID'



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

    getRoleId(): string{
      return localStorage.getItem(ROLE_ID);
    }

    setRoleId(role: string): void{
      console.log(role);
      localStorage.setItem(ROLE_ID, role);
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
      localStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(USER_ID);
      localStorage.removeItem(ROLE_ID);
      console.log("sve smo obrisali")
    }

    saveUsername(username: string) {
      localStorage.removeItem(USERNAME_KEY);
      localStorage.setItem(USERNAME_KEY, username);
      console.log("spremili smo username");
      console.log(this.getUsername());
    }

    getUsername(): string {
      return localStorage.getItem(USERNAME_KEY);
    }

    saveUserID(id: string){
      localStorage.removeItem(USER_ID);
      localStorage.setItem(USER_ID, id);
      console.log("spremili smo userID");
      console.log(this.getUserID());

    }

    getUserID(){
      return localStorage.getItem(USER_ID);
    }



}