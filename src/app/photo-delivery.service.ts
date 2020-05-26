import { Injectable, SimpleChanges } from '@angular/core';
import { Photo } from './photo'
import { BehaviorSubject } from 'rxjs';
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
      //Request photo depending on screen size 
      screen.width < 1000 ? this.url = this.baseUrl +`${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg?nf_resize=fit&w=900` :
      this.url = this.baseUrl +`${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg?nf_resize=fit&w=1200`; 
      return this.url;
    }
    increaseId(){
      this.folderMax = this.getFolderMax();
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
