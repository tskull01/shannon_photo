import { Component, ViewChildren, ElementRef, Renderer2, QueryList,ViewChild } from '@angular/core';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { trigger, stagger, style, animate, transition,query } from '@angular/animations';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
@ViewChildren('hide') hiddenElements: QueryList<ElementRef>;
@ViewChild('grid') gridContainer:ElementRef; 
@ViewChild('fullnav') wrapper:ElementRef; 
navFull:boolean = true; 
photo: boolean = false;
selection:number = 1;

  constructor(private renderer:Renderer2, private photoDelivery:PhotoDeliveryService) { }


  photoSelected(){
  this.photo = true;
    this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','50% 50%');
    this.renderer.setStyle(this.wrapper.nativeElement,'height','18vh');
  }
  setFilter(filter){
    console.log(filter)
    this.photoDelivery.setFilter(filter);
  }
  navSelection(num:number){
    this.selection = num; 
    if(num !== 1){
      this.photo = false;
      this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','100%');
      this.renderer.setStyle(this.wrapper.nativeElement,'height','12vh');
    }
    /*
    if(num !== 1){
      this.hiddenElements.forEach(e => {
        this.renderer.addClass(e.nativeElement, 'hide');
      })
      this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','100%');
      this.renderer.setStyle(this.wrapper.nativeElement,'height','12vh');
    }
    */ 
  }
  selectDisplay(){
    this.selection = 5;
    this.hiddenElements.forEach(e => {
      this.renderer.addClass(e.nativeElement, 'hide');
    })
    this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','100%');
      this.renderer.setStyle(this.wrapper.nativeElement,'height','12vh');
  }
}
