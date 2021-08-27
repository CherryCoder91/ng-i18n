import { Component } from '@angular/core';
import { AngularLocaleRegistrarService } from './angular-locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly ngLocaleService: AngularLocaleRegistrarService) { }
  title = 'my-app';
}
