import {Component, OnInit} from '@angular/core';
import {Item} from "../../common/item";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Category} from "../../common/category";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{

  public items: Item[] = [];
  public categoryId: number = 0;
  public categoryName: string = ""
  public itemsMappedToDate: Map<String, Item[]> = new Map();
  public itemsWithNoDueDate: Item[] = []


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

  private resetMapAndArray() {
    //Reset Map
    this.itemsMappedToDate = new Map()
    //Reset Array
    this.itemsWithNoDueDate = []
  }

  private getItems() {
    this.resetMapAndArray();

    const hasCategoryId = this.route.snapshot.paramMap.has("id");
    const hasCategoryName = this.route.snapshot.paramMap.has("categoryName");

    if (hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get("id")!;
    }
    if (hasCategoryName){
      this.categoryName = this.route.snapshot.paramMap.get("categoryName")!;
    }

    // now get the products for the given category id
    this.categoryService.getItemsFromCategory(this.categoryId).subscribe(
      data => {
        this.items = data.sort((a,b) => {
          if (a.dateDue != null && b.dateDue != null){
            const dateA = new Date(a.dateDue);
            const dateB = new Date(b.dateDue);
            return dateA.getTime() - dateB.getTime();
          }
          else if (a.dateDue == null){
            return 1
          }
          else return 0
        })
        this.MapItemsToDates();
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

  calculateDays(item: Item):number {
    let dateCreated = new Date(item.dateCreated);
    let currentDate = new Date();

    let days = Math.floor((currentDate.getTime() - dateCreated.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  }

  private MapItemsToDates() {
    const datePipe = new DatePipe('en-US');

    for (let item of this.items){
      if (item.dateDue!= null){
        const myDate = new Date(item.dateDue);
        const formattedDate = datePipe.transform(myDate, 'dd.MM')!;

        if (!this.itemsMappedToDate.has(formattedDate)){
          let tempArray: Item[] = [];
          tempArray.push(item)
          this.itemsMappedToDate.set(formattedDate, tempArray)
        }
        else {
          const existingItems = this.itemsMappedToDate.get(formattedDate)!;
          existingItems.push(item);
          this.itemsMappedToDate.set(formattedDate, existingItems);
        }
      }
      else {
        this.itemsWithNoDueDate.push(item)
      }

    }
    if (this.itemsWithNoDueDate.length != 0){
      this.itemsMappedToDate.set("SOMEDAY", this.itemsWithNoDueDate)
    }
  }

}
