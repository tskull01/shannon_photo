import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing-elements',
  templateUrl: './landing-elements.component.html',
  styleUrls: ['./landing-elements.component.css']
})
export class LandingElementsComponent implements OnInit {

  @Input('folderDisplays') folderDisplays: any;
  @Output() folderSelected = new EventEmitter();
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = 'true';
  
  constructor() { }

  ngOnInit(): void {
  }
  selectFolder(f){
    this.folderSelected.emit(f); 
  }
}
