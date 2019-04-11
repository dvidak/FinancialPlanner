import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { UserView } from "../models/userView";
import { AuthService } from "../auth/authentication.service";



const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
    userId : string;

    constructor(private http: HttpClient,
                private auth: AuthService) {
    }

    getUsers(): Observable<UserView[]> {
        return this.http.get<UserView[]>(`http://localhost:1000/api/users`);
    }

    getUserProfile(): Observable<UserView> {
        this.userId = this.auth.getUserID()
        return this.http.get<UserView>(`http://localhost:1000/api/users/${this.userId}`);
    }
}