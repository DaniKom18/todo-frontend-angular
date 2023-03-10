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
  categoryId: number = 0;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
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
    const hasCategoryId = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get("id")!;
    }

    this.categoryService.getItemsFromCategory(this.categoryId).subscribe(
      data => {
        this.items = data;
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
      item.title = name;
      item.dateDue = date
      this.categoryService.updateItem(item, selectedCategoryId.id)
    }
    else alert("please add a title before submitting")

  }
}
