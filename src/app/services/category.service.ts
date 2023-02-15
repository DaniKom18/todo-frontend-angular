import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Category} from "../common/category";
import {Item} from "../common/item";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/categories"
  constructor(private httpclient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpclient.get<Category[]>(this.baseUrl)
  }

  getItemFromCategory(categoryId: number): Observable<Item[]> {
    const itemsFromCategoryUrl = `${this.baseUrl}/${categoryId}/items`

    return this.httpclient.get<Item[]>(itemsFromCategoryUrl)
  }

  postItemToCategory(categoryId: number, description: string) {

    const body = JSON.stringify({"description": description})
    console.log("Message send to category " + categoryId + " Body: " + body)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.httpclient.post(`${this.baseUrl}/${categoryId}/items`, body, httpOptions).subscribe()

}
}
