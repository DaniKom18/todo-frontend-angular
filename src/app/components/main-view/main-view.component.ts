import { Component } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {

  dueTaskText: string[] = ["Ich bin ein Sportler", "Ich bin ein Softwareentwickler", "Ich bin Diszipliniert", "Ich bin ein Student", "Ich bin ein Autor", "Ich bin ein Leser", "Ich bin ein Freund", "Ich bin ein Anime-Fan", "Ich bin ein guter Mensch", "Ich bin Sozialkompetent", "Ich bin ein Koch", "Ich bin ein Frühaufsteher"]
  quotes: string[] = [];
  mantras: string[] = [];

}
