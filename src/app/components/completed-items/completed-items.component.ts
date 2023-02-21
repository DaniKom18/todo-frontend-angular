import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../common/item";

@Component({
  selector: 'app-completed-items',
  templateUrl: './completed-items.component.html',
  styleUrls: ['./completed-items.component.css']
})
export class CompletedItemsComponent implements OnInit{

  items: Item[] = []

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

  getItems(){
    this.categoryService.getCompletedItems().subscribe(
      data => {
        this.items = data
      }
    )
  }

  clearAllItems() {
    this.categoryService.deleteAllItemsFromCategory(5)
  }
}
