import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { ItemView } from "../models/itemView";
import { newItem } from "../models/newItem";
import { AuthService } from "../auth/authentication.service";


const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type':  'application/json',
    }),

};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
    constructor(private http: HttpClient,
                private auth: AuthService) {
    }
    
    userId = this.auth.getUserID();

    getItems(): Observable<ItemView[]> {
        return this.http.get<ItemView[]>(`http://localhost:1000/api/items/${this.userId}`);
    }

    newItem(newItem : newItem): Observable<newItem[]> {
        return this.http.post<newItem[]>(`http://localhost:1000/api/items`,newItem, httpOptions);
    }
}
