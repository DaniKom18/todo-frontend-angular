import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    return this.httpclient.get<GetResponseCategory>(this.baseUrl).pipe(
      map(response => response._embedded.categories)
    )
  }

  getItemFromCategory(categoryId: number): Observable<Item[]> {
    const itemsFromCategoryUrl = `${this.baseUrl}/${categoryId}/items`

    return this.httpclient.get<GetResponseCategoryItems>(itemsFromCategoryUrl).pipe(
      map(response => response._embedded.items.sort((a,b) => a.id - b.id))
    )
  }
}

interface GetResponseCategory{
  _embedded: {
    categories: Category[];
  }
}

interface GetResponseCategoryItems{
  _embedded: {
    items: Item[];
  }
}
