import { Component, EventEmitter,Output, ViewChildren,QueryList,ChangeDetectionStrategy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Photo } from 'src/app/photo'; 
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Folder } from '../folder';
import { Subscription, Observable } from 'rxjs';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-photo-display',
  templateUrl:'./photo-display.component.html',
  styleUrls: ['./photo-display.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: []
})
export class PhotoDisplayComponent {
  masonryItems: Photo[] = [];
  folder:Folder; 
  @ViewChildren('items')items:QueryList<ElementRef>;
  spinner: boolean = true; 
  folderOrder:number[] = [];
  selectedPhoto:Photo;
  sub:Subscription;
  renderCount:number = 0; 
  observer:Observable<string[]>;
  mode: ProgressSpinnerMode = "determinate";
  value:number;
  @Output() setSelection = new EventEmitter();
constructor(private photoService:PhotoDeliveryService, private renderer:Renderer2){
this.photoService.folderChange.subscribe((folder) => {
    this.folder = new Folder(folder.id,folder.name,folder.order,folder.displayName,folder.displayPhoto);
    this.zeroOutArray();
    this.formatOrder(this.folder.order);
    this.setCurrentPhotos();
  }
   )
}
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      this.ngForRendred();
    })
  }
  ngForRendred(){
    console.log('rendered')
  }
formatOrder(str:string){
let inBetween = str.split(',')
inBetween.forEach(num => {
  this.folderOrder.push(+num); 
})
}
setCurrentPhotos(){
    //Set all of the images
  let stringArray = [];
  for(let i of this.folderOrder){
    this.masonryItems.push(new Photo(i, `../../assets/images/${this.folder.name}/${this.folder.name}(${i}).jpg?nf_resize=fit&w=400`,this.folder.name, false));
    stringArray.push(this.masonryItems[i].path);
  } 
  this.observer = new Observable((obs) => {
    obs.next(stringArray);
  })
} 
  disableRightClick(e){
    return false;
  }
  displayDialog(obs){
    //Changing content view to the full photo
    //Using regex to match parentheses and pass image to full view
    const regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(obs);
    this.selectedPhoto = new Photo(Number.parseInt(matches[1]),obs,this.folder.name,true);
    this.photoService.setPhoto(this.selectedPhoto);
    this.setSelection.emit();
  }

 zeroOutArray(){
   this.renderCount = 0;
   this.value = 0; 
  this.masonryItems = []; 
  this.spinner = true;
  if(this.items){
    this.items.forEach((item) => {
      this.hideElement(item);
    })
  }
  this.folderOrder = [];
  window.scrollTo(0,0);
  }
  showImage(item){
  this.renderCount++;
  this.value = Math.round((this.renderCount/this.folderOrder.length) * 100);
  if(this.renderCount === this.folderOrder.length){
    this.spinner = false;
    this.items.forEach((item) => {
     this.showElement(item)
      })
    }
  }
  showElement(element:ElementRef){
    this.renderer.removeClass(element.nativeElement, 'hidden');
    this.renderer.addClass(element.nativeElement, 'loaded');
  }
  hideElement(element:ElementRef){
    this.renderer.removeClass(element.nativeElement, 'loaded');
    this.renderer.addClass(element.nativeElement, 'hidden');
  }
}