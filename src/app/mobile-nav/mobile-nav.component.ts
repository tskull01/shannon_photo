import { Component, OnInit, ViewChild } from '@angular/core';
import { MobileDisplayComponent } from '../mobile-display/mobile-display.component';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css']
})
export class MobileNavComponent  {
photography:boolean = false; 
selection:number = 1;
filter:string = 'action';
@ViewChild('display')displayComponent:MobileDisplayComponent; 
  constructor() { }

setSelection(num:number){
  if(num === 1){
    this.setPhotography(true); 
  }
  this.selection = num; 
}

setFilter(num: number){
    console.log(this.filter);
    switch(num){
      case 1:
      this.filter = 'action';
      break;
      case 2 :
      this.filter = 'combat';
      break;
      case 3:
      this.filter = 'environment';
      break;
      case 4:
      this.filter = 'product';
      break;
      case 5:
      this.filter = 'personal';
      break;
    }
}
setPhotography(bool:boolean){
  this.photography = bool;
  }
}
