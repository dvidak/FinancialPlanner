import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { SavingsView } from "../models/savingsView";
import { newSaving } from "../models/newSaving";
import { updateSaving } from "../models/updateSaving";

import { AuthService } from "../auth/authentication.service";


const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
    }),
};

@Injectable({
  providedIn: 'root'
})

export class SavingsService {
    userId : string;
    constructor(private http: HttpClient,
                private auth: AuthService) {
    }
    
    getSavings(): Observable<SavingsView[]> {
        this.userId = this.auth.getUserID();
        return this.http.get<SavingsView[]>(`http://localhost:1000/api/savings/${this.userId}`);
    }

    newSavings(newSaving : newSaving): Observable<newSaving[]> {
        return this.http.post<newSaving[]>(`http://localhost:1000/api/savings`,newSaving, httpOptions);
    }

    updateSavings(add : updateSaving): Observable<updateSaving>{
        var savingsId = add.saving_id;
        return this.http.put<updateSaving>(`http://localhost:1000/api/savings/${savingsId}`,add, httpOptions);
    }
}
