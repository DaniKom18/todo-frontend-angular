import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidbarCategoryComponent } from './components/sidbar-category/sidbar-category.component';
import {CategoryService} from "./services/category.service";
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { InboxComponent } from './components/inbox/inbox.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import {FormsModule} from "@angular/forms";
import { CompletedItemsComponent } from './components/completed-items/completed-items.component';

const routes: Routes = [
  {path: "edit/:categoryName/:itemId", component: EditItemComponent},
  {path: "category/completed/5", component: CompletedItemsComponent},
  {path: "category/inbox/1", component: InboxComponent},
  {path: "category/:categoryName/:id", component: ItemListComponent},
  {path: "main-view", component: MainViewComponent},
  {path: "", redirectTo:"/", pathMatch:"full"},
  {path: "**", redirectTo:"/", pathMatch:"full"},
]

@NgModule({
  declarations: [
    AppComponent,
    SidbarCategoryComponent,
    InboxComponent,
    ItemListComponent,
    MainViewComponent,
    EditItemComponent,
    CompletedItemsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
