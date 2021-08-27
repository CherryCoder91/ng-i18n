import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.css']
})
export class ComponentBComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) public readonly locale: string) { }

  public myDate = Date.now();
  public myNumber = 12345.12345;
  public myCurrency = 2.5;
  public myPercent = 0.56;
  public myUppercase = 'A big brown fox jumped over';
  public myLowercase = 'A big brown fox jumped over';


  ngOnInit(): void {
  }

}
