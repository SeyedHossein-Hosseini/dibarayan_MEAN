import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LocalstorageService } from './services/localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private localstorage: LocalstorageService,
    private Location: Location
  ) {}

  currentRoute: string;

  ngOnInit() {
    this.currentRoute = this.Location.path();
  }

  title = 'dibarayan_front';
}
