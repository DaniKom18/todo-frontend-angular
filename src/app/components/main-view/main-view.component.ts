import { Component } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {

  dueTaskText: string[] = ["Due tasks this week", "Due tasks this month", "Due tasks total"]
  doneTaskText: string[] = ["Done tasks this week", "Done tasks this month", "Done tasks total"];
  quotes: string[] = [];
  mantras: string[] = [];

}
