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

const routes: Routes = [
  {path: "category/:id", component: ItemListComponent},
  {path: "inbox", component: InboxComponent},
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
    MainViewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
