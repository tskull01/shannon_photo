import {
  Component,
  EventEmitter,
  Output,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Photo } from "src/app/photo";
import { PhotoDeliveryService } from "../photo-delivery.service";
import { Folder } from "../folder";
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { FolderBuilderService } from "../folder-builder.service";
@Component({
  selector: "app-photo-display",
  templateUrl: "./photo-display.component.html",
  styleUrls: ["./photo-display.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [],
})
export class PhotoDisplayComponent {
  masonryItems: Photo[] = [];
  folder: Folder;
  @ViewChildren("items") items: QueryList<ElementRef>;
  spinner: boolean = true;
  folderLimit: number = 0;
  selectedPhoto: Photo;
  sub: Subscription;
  renderCount: number = 0;
  mode: ProgressSpinnerMode = "indeterminate";
  value: number;
  diameter: number = 50;
  @Output() setSelection = new EventEmitter();
  observer: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(
    private photoService: PhotoDeliveryService,
    private renderer: Renderer2,
    private folderService: FolderBuilderService
  ) {
    this.photoService.albumPhotos.subscribe((photos) => {
      this.zeroOutArray();
      this.setCurrentPhotos(photos);
    });
    this.folderService.folderSubject.subscribe((folder) => {
      this.folder = new Folder(
        folder.title,
        folder.displaySrc,
        folder.imageSrcs
      );
    });
  }
  ngAfterViewInit() {
    this.items.changes.subscribe((t) => {
      this.ngForRendred();
    });
  }
  ngForRendred() {
    console.log("rendered");
  }
  setCurrentPhotos(photos) {
    //Set all of the images
    let srcArray: string[] = [];
    photos.forEach((photo) => (photo ? srcArray.push(photo.path) : null));
    this.folderLimit = srcArray.length;
    this.observer.next(srcArray);
  }
  disableRightClick(e) {
    return false;
  }
  displayDialog(obs) {
    //Changing content view to the full photo
    //Using regex to match parentheses and pass image to full view
    const regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(obs);
    this.selectedPhoto = new Photo(
      Number.parseInt(matches[1]),
      obs,
      this.folder.title,
      true
    );
    this.photoService.setPhoto(this.selectedPhoto);
    this.setSelection.emit();
  }

  zeroOutArray() {
    this.renderCount = 0;
    // Determinate spinner option this.value = 0;
    console.log("zeroing out observer");
    this.observer.next([]);
    this.spinner = true;
    if (this.items) {
      this.items.forEach((item) => {
        this.hideElement(item);
      });
    }
    this.folderLimit = 0;
    window.scrollTo(0, 0);
  }
  showImage(item) {
    this.renderCount++;
    // Determinate spinner option this.value = Math.round((this.renderCount/this.folderOrder.length) * 100);
    if (this.renderCount === this.folderLimit - 1) {
      this.spinner = false;
      this.items.forEach((item) => {
        this.showElement(item);
      });
    }
  }
  showElement(element: ElementRef) {
    this.renderer.removeClass(element.nativeElement, "hidden");
    this.renderer.addClass(element.nativeElement, "loaded");
  }
  hideElement(element: ElementRef) {
    this.renderer.removeClass(element.nativeElement, "loaded");
    this.renderer.addClass(element.nativeElement, "hidden");
  }
}
