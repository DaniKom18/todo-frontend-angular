import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Category} from "../common/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/categories"
  constructor(private httpclient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpclient.get<GetResponseCategory>(this.baseUrl).pipe(
      map(response => response._embedded.categories)
    )
  }
}

interface GetResponseCategory{
  _embedded: {
    categories: Category[];
  }
}
