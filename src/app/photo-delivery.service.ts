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
  albumPhotos = new BehaviorSubject<Photo[]>(this.photos);
  url: string;
  folderMax: string[] = [];
  currentIndex: number = 0;
  constructor(private folderBuilder: FolderBuilderService) {
    this.folderBuilder.folderSubject.subscribe((value) => {
      //When current folder updates set current photos
      this.photos = [];
      this.folder = value;
      value ? this.setAlbumPhotos() : null;
    });
  }

  setPhoto(photo: Photo) {
    this.currentIndex = photo.id;
    this.selectedPhoto = photo;
  }

  getPhoto(): string {
    //Request photo depending on screen size
    screen.width < 1000
      ? (this.url = `${this.selectedPhoto.path}?nf_resize=fit&w=900`)
      : (this.url = this.selectedPhoto.path);
    return this.url;
  }
  increaseId() {
    if (this.currentIndex >= this.photos.length - 1) {
      this.currentIndex = 0;
      this.selectedPhoto = this.photos[this.currentIndex];
    } else {
      this.currentIndex++;
      this.selectedPhoto = this.photos[this.currentIndex];
    }
  }
  decreaseId() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.photos.length - 1;
      this.selectedPhoto = this.photos[this.currentIndex];
    } else {
      this.currentIndex--;
      this.selectedPhoto = this.photos[this.currentIndex];
    }
  }
  setAlbumPhotos() {
    //Setting current photos
    this.photos = this.folder.imageSrcs
      .map((photo, i) => new Photo(i, photo, this.folder.title, false))
      .filter((photo) => photo.path !== "");
    this.albumPhotos.next(this.photos);
  }
  getAlbumPhotos() {
    return this.albumPhotos.value;
  }
}
