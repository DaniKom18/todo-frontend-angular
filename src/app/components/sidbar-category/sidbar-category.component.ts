import {Component, OnInit} from '@angular/core';
import {Category} from "../../common/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-sidbar-category',
  templateUrl: './sidbar-category.component.html',
  styleUrls: ['./sidbar-category.component.css']
})
export class SidbarCategoryComponent implements OnInit{

  categories: Category[] = []


  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.listCategories()
  }

  private listCategories()  {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      }
    );
  }
}
