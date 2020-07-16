import { Component, ViewChild, ElementRef } from "@angular/core";
import { Photo } from "../photo";
import { FolderBuilderService } from "../folder-builder.service";
import { Folder } from "../folder";
import { PhotoDeliveryService } from "../photo-delivery.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-mobile-display",
  templateUrl: "./mobile-display.component.html",
  styleUrls: ["./mobile-display.component.css"],
})
export class MobileDisplayComponent {
  sizeOfAlbum: number;
  folder: Folder;
  currentAlbum: Folder;
  photos: Photo[] = [];
  currentPhoto: BehaviorSubject<any>;
  folderOrder: number[] = [];
  @ViewChild("container") container: ElementRef;
  albumIndex: number = 0;
  constructor(
    private folderService: FolderBuilderService,
    private photoDelivery: PhotoDeliveryService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.folderService.folderSubject.subscribe((folder) => {
      console.log(folder);
      this.currentAlbum = folder;
      this.zeroEverythingOut();
      this.sizeOfAlbum = this.currentAlbum.imageSrcs.length;
      this.setCurrentPhotos();
      this.currentPhoto = new BehaviorSubject(this.photos[0].path);
    });

    this.currentPhoto.subscribe((value) => {
      console.log(value);
    });
  }
  setCurrentPhotos() {
    for (let i = 1; i <= this.sizeOfAlbum; i++) {
      this.photos.push(
        new Photo(
          i,
          this.currentAlbum.imageSrcs[i],
          this.currentAlbum.title,
          false
        )
      );
    }
  }

  zeroEverythingOut() {
    this.folderOrder = [];
    this.photos = [];
  }
  handleSwipeLeft(event) {
    this.albumIndex <= 0
      ? (this.albumIndex = this.sizeOfAlbum - 1)
      : this.albumIndex--;
    this.currentPhoto.next(this.photos[this.albumIndex].path);
  }
  handleSwipeRight(event) {
    console.log(this.albumIndex + "ALbum Index");
    this.albumIndex >= this.sizeOfAlbum - 1
      ? (this.albumIndex = 0)
      : this.albumIndex++;
    this.currentPhoto.next(this.photos[this.albumIndex].path);
  }
}
