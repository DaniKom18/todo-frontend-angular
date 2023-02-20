import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, Subject, tap} from "rxjs";
import {Category} from "../common/category";
import {Item} from "../common/item";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/categories"
  private itemUrl = "http://localhost:8080/api/items"
  private _refreshRequired = new Subject<void>();
  get RefreshRequired(){
    return this._refreshRequired;
  }
  constructor(private httpclient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpclient.get<Category[]>(this.baseUrl)
  }

  getItemsFromCategory(categoryId: number): Observable<Item[]> {
    const itemsFromCategoryUrl = `${this.baseUrl}/${categoryId}/items`

    return this.httpclient.get<Item[]>(itemsFromCategoryUrl)
  }

  getItem(itemId: number): Observable<Item>{
    const getSingleItemUrl = `${this.itemUrl}/${itemId}`
    return this.httpclient.get<Item>(getSingleItemUrl);
  }

  postItemToCategory(categoryId: number, description: string) {

    const body = JSON.stringify({"description": description})

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.httpclient.post(`${this.baseUrl}/${categoryId}/items`, body, httpOptions).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    ).subscribe()

}

  deleteItemFromCategory(id: number) {
    this.httpclient.delete(`${this.itemUrl}/${id}`).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    ).subscribe()
  }

  updateItem(item: Item, categoryId: number) {

    const body = JSON.stringify(item);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.httpclient.put(`${this.baseUrl}/${categoryId}/items`,body, httpOptions).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    ).subscribe()
  }
}
