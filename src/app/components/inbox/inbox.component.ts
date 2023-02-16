import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../common/item";
import {Category} from "../../common/category";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit{

  items: Item[] = [];
  categories: Category[] = []
  categoryId: number = 1;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getItems();
    this.getCategories()
    this.categoryService.RefreshRequired.subscribe(
      ()=> this.getItems()
    )
  }

  postInboxMessage(description: string) {
    this.categoryService.postItemToCategory(this.categoryId, description)
  }

  getItems() {
    this.categoryService.getItemFromCategory(this.categoryId).subscribe(
      data => {
        this.items = data.sort((a,b) => a.id - b.id);
      }
    )
  }

  deleteInboxMessage(item: Item) {
    this.categoryService.deleteItemFromCategory(item.id)
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }
}
