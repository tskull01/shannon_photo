import { Component, EventEmitter,Output, ViewChildren,QueryList,ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { Photo } from 'src/app/photo'; 
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Folder } from '../folder';
import { Subscription } from 'rxjs';
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
  folderOrder:number[] = [];
  selectedPhoto:Photo;
  defaultImage = '../../assets/extras/white.jpg'
  sub:Subscription;
  renderCount:number = 0; 
  @Output() setSelection = new EventEmitter();
constructor(private photoService:PhotoDeliveryService, private renderer:Renderer2){
this.photoService.folderChange.subscribe((folder) => {
  console.log('change')
    this.folder = new Folder(folder.id,folder.name,folder.order,folder.displayName,folder.displayPhoto);
    this.zeroOutArray();
    this.formatOrder(this.folder.order);
    this.setCurrentPhotos();
  }
   )
}
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      console.log(t);
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
  for(let i of this.folderOrder){
    this.masonryItems.push(new Photo(i, `../../assets/images/${this.folder.name}/${this.folder.name}(${i}).jpg?nf_resize=fit&w=300`,this.folder.name, false));
  }  
  console.log(this.masonryItems)
} 
  disableRightClick(e){
    return false;
  }
  displayDialog(path:string, id:number){
    //Changing content view to the full photo
    this.selectedPhoto = new Photo(id,path,this.folder.name,false);
    this.photoService.setPhoto(this.selectedPhoto);
    this.setSelection.emit();
  }
 everythingLoaded(){
   //Start animation
  console.log(this.masonryItems)
 }
 identify(item:Photo){
   return item.id; 
 }
 zeroOutArray(){
   this.renderCount = 0;
  this.masonryItems = []; 
  if(this.items){
    this.items.forEach((item) => {
      this.renderer.addClass(item.nativeElement, 'hidden');
      this.renderer.removeClass(item.nativeElement, 'loaded');
    })
  }
  this.folderOrder = [];
  window.scrollTo(0,0);
  }
  showImage(item){
  this.renderCount++;
  console.log(this.renderCount);
  if(this.renderCount === this.folderOrder.length){
    this.items.forEach((item) => {
      this.renderer.removeClass(item.nativeElement, 'hidden');
      this.renderer.addClass(item.nativeElement, 'loaded');
    })
  }
  }
}