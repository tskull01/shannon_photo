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
  currentAlbum: string[];
  photos: Photo[] = [];
  currentPhoto: BehaviorSubject<any>;
  folderOrder: number[] = [];
  @ViewChild("container") container: ElementRef;
  currentIndex: number = 0;
  constructor(
    private folderService: FolderBuilderService,
    private photoDelivery: PhotoDeliveryService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.photoDelivery.albumPhotos.subscribe((photos) => {
      //This should take from the photo service no reason for this component to know the folders
      this.zeroEverythingOut();
      this.photos = photos;
      this.currentPhoto = new BehaviorSubject(
        this.photos[this.currentIndex].path
      );
    });
  }

  zeroEverythingOut() {
    this.currentIndex = 0;
    this.photos = [];
  }
  handleSwipeLeft(event) {
    this.currentIndex <= 0
      ? (this.currentIndex = this.sizeOfAlbum - 1)
      : this.currentIndex--;
    this.currentPhoto.next(this.photos[this.currentIndex].path);
  }
  handleSwipeRight(event) {
    console.log(this.currentIndex + "ALbum Index");
    this.currentIndex >= this.sizeOfAlbum - 1
      ? (this.currentIndex = 0)
      : this.currentIndex++;
    this.currentPhoto.next(this.photos[this.currentIndex].path);
  }
}
