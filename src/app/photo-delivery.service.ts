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
  folderMax:string[] = []; 
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
      return this.url;
    }
    increaseId(){
      console.log(this.selectedPhoto.id);
      console.log(this.folderMax);
      this.folderMax = this.getFolderMax();
      console.log(this.folderMax)
      this.selectedPhoto.id >= this.folderMax.length ? this.selectedPhoto.id = 1 : this.selectedPhoto.id++; 
    }
    decreaseId(){
      this.folderMax = this.getFolderMax();
      this.selectedPhoto.id <= 1 ? this.selectedPhoto.id = this.folderMax.length : this.selectedPhoto.id--; 
    }
    setFolder(folder){
      this.folderChange.next(folder);
    }
    getFolderMax(){
     let holder = this.folder.order.split(',')
      return holder;
    }
}
