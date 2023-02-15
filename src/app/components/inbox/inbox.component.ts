import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../common/item";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit{

  items: Item[] = [];
  categoryId: number = 1;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getItems()
    });
  }

  postInboxMessage(description: string) {
    this.categoryService.postItemToCategory(this.categoryId, description)
  }

  getItems() {
    this.categoryService.getItemFromCategory(this.categoryId).subscribe(
      data => {
        this.items = data;
      }
    )
  }
}
