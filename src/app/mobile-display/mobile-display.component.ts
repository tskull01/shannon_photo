import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import {Photo} from '../photo';
import{SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-mobile-display',
  template: `
  <swiper #swiper [config]="config" >
    <div *ngFor="let slide of carouselItems" class="cursor-pointer">
      <img class="swiper-slide" src={{slide.path}}/>
    </div>
</swiper>
`,
  styleUrls: ['./mobile-display.component.css']
})
export class MobileDisplayComponent {
  sizeOfAlbum:number; 
  @Input('filter')filter:string;
  carouselItems:Photo[] = []; 
  @ViewChild('swiper')swiper:SwiperComponent;
  config:SwiperConfigInterface = {
    loop: true,
    a11y: true,
    direction: 'horizontal',
    initialSlide: 0,
    slidesPerView: 1, 
    slidesPerColumn: 1,
    slideToClickedSlide: true,
    centeredSlides:true,
    roundLengths: true,
    observer: true,
    setWrapperSize: true,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    keyboard: true,
    pagination: false
  };
 
  constructor() { }

ngOnChanges(changes:SimpleChanges){
  this.setSizeofAlbum(this.filter).then(() => (this.setCurrentPhotos()))
  .catch((err) => {
    console.log(`There was an error loading images ${err}`);
  });
}
 async setSizeofAlbum(currentSet){
   /*return new Promise((resolve, reject)=>{
    this.zeroOutArray();
    this.fileService.fileSizes().subscribe((sizes) => {
      this.sizeOfAlbum = sizes[currentSet];
      if(this.sizeOfAlbum > 1 ){
        resolve();
      }
    }) 
   })*/
  }
  setCurrentPhotos(){
      for(let i = 1;i <= this.sizeOfAlbum; i++){
        this.carouselItems.push(new Photo(i, `../../assets/images/${this.filter}/${this.filter}(${i}).jpg`,this.filter,false));
      }
  }
  zeroOutArray(){
    this.sizeOfAlbum = 0;
    this.carouselItems = []; 
  }
}
