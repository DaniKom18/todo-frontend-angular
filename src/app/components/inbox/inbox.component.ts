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
    this.getCategories();
    this.categoryService.RefreshRequired.subscribe(
      ()=> this.getItems()
    )
  }

  postInboxMessage(description: string) {
    if (description.length > 3){
      this.categoryService.postItemToCategory(this.categoryId, description)
    }
    else alert("message must be larger than 3 characters")
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
        this.categories = data.filter(o => o.name != 'Inbox');
      }
    )
  }

  updateInboxMessage(item: Item, name: string, categoryName: string, date: Date) {
    console.log(item.id +" => " + name +" => " + categoryName+" => " + date)

    if (name.length > 0){
      const selectedCategoryId = this.categories.find(category => category.name == categoryName)!;
      item.name = name;
      item.dateDue = date
      this.categoryService.updateItem(item, selectedCategoryId.id)
    }
    else alert("Please fill all gaps")

  }
}
