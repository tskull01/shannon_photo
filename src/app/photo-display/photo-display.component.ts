import { Component, EventEmitter,Output, ViewChild, ViewChildren,QueryList,ChangeDetectionStrategy } from '@angular/core';
import { Photo } from 'src/app/photo'; 
import { PhotoDeliveryService } from '../photo-delivery.service';
import { NgxMasonryComponent,NgxMasonryOptions } from 'ngx-masonry';
import { FilesizeService } from '../filesize.service';
import { trigger, stagger, style, animate, transition,query } from '@angular/animations';
@Component({
  selector: 'app-photo-display',
  templateUrl:'./photo-display.component.html',
  styleUrls: ['./photo-display.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    /*
    trigger('inOutAnimation', [
        transition(':enter', [
            style({ opacity:0 }),
            animate('500ms ease-in', style({ opacity:1}))
          ]
        ),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('1s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
    */
  ]
})
export class PhotoDisplayComponent {
  masonryItems: Photo[] = [];
  masonryItemsSmall:Photo[]=[]; 
  sizeOfAlbum:number; 
private _filter:string = 'action'; 
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  @ViewChildren('items')items:QueryList<any>;
  updateMasonryLayout:boolean = false;
  selectedPhoto:Photo;
  options:NgxMasonryOptions = {
    initLayout:true
  };
  @Output() setSelection = new EventEmitter();
constructor(private photoService:PhotoDeliveryService, private fileService:FilesizeService ){
     this.photoService.filterChange.subscribe((value) =>{
       this._filter = value;
       this.setSizeofAlbum(this._filter)
       .then(() => (this.setCurrentPhotos()))
       .then(() => (this.everythingLoaded()))
       .then(()=>(console.log('scrolling')))
       .then(()=> (window.scrollTo(0,0)))
       .then(()=>(console.log('scrolled')));
     })
  }
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      this.ngForRendred();
    })
  }
  ngForRendred(){
    console.log('rendered')
  }
  ngOnInit(): void {
    this.setSizeofAlbum(this._filter)
    .then(() => (this.setCurrentPhotos()))
    .then(()=>(console.log(this.masonryItems)))
    .then(() => (this.everythingLoaded()))
    .then(()=>(console.log(this._filter)))
    .then(()=> (window.scrollTo(0,0)))
    .then(()=>(console.log('scrolled')));
  }
  setSizeofAlbum(currentSet){
    //Getting file sizes from function
    return new Promise((resolve, reject) => {
      this.zeroOutArray();
      this.fileService.fileSizes().subscribe((sizes) => {
        console.log(sizes);
      this.sizeOfAlbum = sizes[currentSet];
      if(this.sizeOfAlbum > 1){
        console.log('resolving');
        resolve(); 
      }
      }) 
    })
  }

setCurrentPhotos(){
    //Set all of the images
      for(let i = 1;i <= this.sizeOfAlbum; i++){
        this.masonryItems.push(new Photo(i, `../../assets/images/${this._filter}/${this._filter}(${i}).jpg?nf_resize=fit&w=300`,this._filter));
  }
}
  disableRightClick(e){
    return false;
  }
  displayDialog(path:string, id:number){
    //Changing content view to the full photo
    this.selectedPhoto = new Photo(id,path,this._filter);
    this.photoService.setPhoto(this.selectedPhoto);
    this.setSelection.emit();
  }
 callLayout(){
   console.log('calling layout')
   this.masonry.reloadItems();
   this.masonry.layout();
 }
 everythingLoaded(){
   //Start animation
  console.log(this.masonryItems)
 }
 identify(item:Photo){
   return item.id; 
 }
 zeroOutArray(){
  this.sizeOfAlbum = 0;
  this.masonryItems = []; 
  }
 
}