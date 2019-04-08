import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import { SubcategoryView } from "../models/subcategoryView";


const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
    constructor(private http: HttpClient) {
    }

    income: number =1;
    expense: number =2;

    getSubcategoriesIncome(): Observable<SubcategoryView[]> {
        return this.http.get<SubcategoryView[]>(`http://localhost:1000/api/subcategories/${this.income}`);
    }

    getSubcategoriesExpense(): Observable<SubcategoryView[]> {
        return this.http.get<SubcategoryView[]>(`http://localhost:1000/api/subcategories/${this.expense}`);
    }
}
