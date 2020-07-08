import { Injectable, SimpleChanges } from "@angular/core";
import { Photo } from "./photo";
import { BehaviorSubject } from "rxjs";
import { Folder } from "./folder";
import { FolderBuilderService } from "./folder-builder.service";
@Injectable({
  providedIn: "root",
})
export class PhotoDeliveryService {
  selectedPhoto: Photo;
  folder: Folder;
  photos: Photo[];
  folderChange = new BehaviorSubject<Folder>(this.folder);
  albumPhotos = new BehaviorSubject<Photo[]>(this.photos);
  url: string;
  baseUrl: string = "../assets/images/";
  folderMax: string[] = [];
  constructor(private folderBuilder: FolderBuilderService) {}
  getFolder() {
    this.folderBuilder.folderSubject.subscribe((value) => {
      console.log(value + "INSIDE PHOTO SERVICE");
      this.folder = value;
      value ? this.setAlbumPhotos() : null;
    });
  }
  setPhoto(photo: Photo) {
    this.selectedPhoto = photo;
  }

  getPhoto(): string {
    //Request photo depending on screen size
    screen.width < 1000
      ? (this.url =
          this.baseUrl +
          `${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg?nf_resize=fit&w=900`)
      : (this.url =
          this.baseUrl +
          `${this.selectedPhoto.category}/${this.selectedPhoto.category}(${this.selectedPhoto.id}).jpg?nf_resize=fit&w=1200`);
    return this.url;
  }
  increaseId() {
    //folder max is the imgSrcs length
    this.selectedPhoto.id >= this.folder.imageSrcs.length
      ? (this.selectedPhoto.id = 1)
      : this.selectedPhoto.id++;
  }
  decreaseId() {
    this.selectedPhoto.id <= 1
      ? (this.selectedPhoto.id = this.folder.imageSrcs.length)
      : this.selectedPhoto.id--;
  }
  setFolder(folder) {
    this.folderChange.next(folder);
  }
  setAlbumPhotos() {
    this.photos = this.folder.imageSrcs.map(
      (photo, i) => new Photo(i, photo, this.folder.title, false)
    );
    this.albumPhotos.next(this.photos);
  }
}
