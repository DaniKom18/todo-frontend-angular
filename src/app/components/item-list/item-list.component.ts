import {Component, OnInit} from '@angular/core';
import {Item} from "../../common/item";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{

  public items: Item[] = [];
  public categoryId: number = 0;


  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getItems();
    });
    this.categoryService.RefreshRequired.subscribe(
      () => this.getItems()
    )
  }

  private getItems() {
    const hasCategoryId = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get("id")!;
    }

    // now get the products for the given category id
    this.categoryService.getItemFromCategory(this.categoryId).subscribe(
      data => {
        this.items = data
      }
    )
  }

  deleteItem(item: Item){
    this.categoryService.deleteItemFromCategory(item.id);
  }

  updateItemToCompleted(item:Item, categoryId: number){
    item.dateCompleted = new Date();
    this.categoryService.updateItem(item, categoryId)
  }
}
