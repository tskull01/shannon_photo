import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import {Photo} from '../photo';
import{SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { FolderBuilderService } from '../folder-builder.service';
import { Folder } from '../folder';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Observable, fromEvent } from 'rxjs';


@Component({
  selector: 'app-mobile-display',
  templateUrl: './mobile-display.component.html',
  styleUrls: ['./mobile-display.component.css']
})
export class MobileDisplayComponent {
  sizeOfAlbum:number; 
  folders:Folder[];
  currentAlbum:Folder; 
  photos:Photo[]; 
  touchStart:Observable<any> = fromEvent(window, "touchstart");
  touchEnd:Observable<any> = fromEvent(window, "touchstart");
  touchMove:Observable<any> = fromEvent(window, "touchstart");
  constructor(private folderService:FolderBuilderService, private photoDelivery:PhotoDeliveryService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.folderService.folderSubject.subscribe((folders) => {
      this.folders = folders; 
    })
    this.photoDelivery.folderChange.subscribe((folder) => {
      this.currentAlbum = folder;
    })
    this.touchMove.subscribe((event) => console.log(event))
  }

  setCurrentPhotos(){
      for(let i = 1;i <= this.sizeOfAlbum; i++){
        this.photos.push(new Photo(i, `../../assets/images/${this.currentAlbum.name}/${this.currentAlbum.name}(${i}).jpg`,this.currentAlbum.name,false));
      }
  }
  
}
