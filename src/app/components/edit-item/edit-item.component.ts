import {Component, OnInit} from '@angular/core';
import {Item} from "../../common/item";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../common/category";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit{
  public item: any
  public previousCategoryName: string = ""
  public currentItemId: number = 0
  selectedDate: any;
  categoryId: number = 0;
  categories: Category[] = [];


  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getItem();
      this.getCategories()
    });
  }


  private getItem() {
    const hasItem = this.route.snapshot.paramMap.has("itemId");
    const hasCategoryName = this.route.snapshot.paramMap.has("categoryName");

    if (hasItem){
      this.currentItemId = +this.route.snapshot.paramMap.get("itemId")!;
    }
    if (hasCategoryName){
      this.previousCategoryName = this.route.snapshot.paramMap.get("categoryName")!;
    }

    this.categoryService.getItem(this.currentItemId).subscribe(
      data => {
        this.item = data;
        if (data.dateDue != null){
          this.selectedDate = new Date(data.dateDue)
        }
      }
    )
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data.filter(o => o.name != 'Inbox' && o.name != this.previousCategoryName);
        this.categoryId = +data.find(o => o.name == this.previousCategoryName)!.id
      }
    )
  }

  updateItem(title: string, description: string, categoryName: string, date: Date) {
    if(title.length > 0 && description.length > 0){
      this.item.title = title
      this.item.description = description
      if (date != null){
        this.item.dateDue = date
      }
      if (categoryName != this.previousCategoryName){
        this.categoryId = this.categories.find(o => o.name == categoryName)!.id
      }
      this.categoryService.updateItem(this.item, this.categoryId)
    }
    else alert("Please enter a title and description")

  }
}
