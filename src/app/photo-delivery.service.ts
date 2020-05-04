import { Injectable } from '@angular/core';
import { Photo } from './photo'
import { Subject } from 'rxjs';
import { FilesizeService } from './filesize.service';
@Injectable({
  providedIn: 'root'
})
export class PhotoDeliveryService {
  selectedPhoto: Photo;
  filter:string = 'action';
  filterChange:Subject<string> = new Subject<string>();
  url:string;
  baseUrl:string = '../assets/images/';
  folderMax:number; 
    constructor(private fileService:FilesizeService) { 
      this.filterChange.subscribe((value) => {
        console.log(value)
        this.filter = value;
      })
    }
  //setting the path to deliver to cloudinary
    setPhoto(photo:Photo){
  this.selectedPhoto = photo; 
    }
    getPhoto():string{
      this.url = this.baseUrl +`${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg`;
      console.log(this.url);
      return this.url;
    }
    increaseId(){
      this.selectedPhoto.id >= this.folderMax ?   this.selectedPhoto.id = 1 : this.selectedPhoto.id++; 
    }
    decreaseId(){
      this.selectedPhoto.id <= 1 ? this.selectedPhoto.id = this.folderMax : this.selectedPhoto.id--; 
    }

    setFilter(filter){
      this.filterChange.next(filter);
    }

    getFilter(){
      return this.filter; 
    }
    setFolderMax(){
     this.fileService.fileSizes().subscribe(data => this.folderMax = data[this.selectedPhoto.category]) 
    }
}
