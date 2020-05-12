import { Injectable, SimpleChanges } from '@angular/core';
import { Photo } from './photo'
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Folder } from './folder';
@Injectable({
  providedIn: 'root'
})
export class PhotoDeliveryService {
  selectedPhoto: Photo;
  folder:Folder;
  folderChange = new BehaviorSubject<Folder>(this.folder);
  url:string;
  baseUrl:string = '../assets/images/';
  folderMax:number; 
    constructor() {
      this.folderChange.subscribe(value => 
        this.folder = value
      )
    }
    setPhoto(photo:Photo){
  this.selectedPhoto = photo; 
    }
    getPhoto():string{
      this.url = this.baseUrl +`${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg`;
      console.log(this.url);
      return this.url;
    }
    increaseId(){
      this.selectedPhoto.id >= this.folderMax ? this.selectedPhoto.id = 1 : this.selectedPhoto.id++; 
    }
    decreaseId(){
      this.selectedPhoto.id <= 1 ? this.selectedPhoto.id = this.folderMax : this.selectedPhoto.id--; 
    }
    setFolder(folder){
      console.log(folder)
      this.folderChange.next(folder);
    }
    setFolderMax(){
    this.folder.order.length;
    }
}
