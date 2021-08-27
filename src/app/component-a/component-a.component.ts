import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.css']
})
export class ComponentAComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) public readonly locale: string) { }

  ngOnInit(): void {
  }

}
