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
import { Subscription, Observable } from "rxjs";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
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
  folderOrder: number[] = [];
  selectedPhoto: Photo;
  sub: Subscription;
  renderCount: number = 0;
  observer: Observable<string[]>;
  mode: ProgressSpinnerMode = "indeterminate";
  value: number;
  diameter: number = 50;
  @Output() setSelection = new EventEmitter();
  constructor(
    private photoService: PhotoDeliveryService,
    private renderer: Renderer2
  ) {
    this.photoService.folderChange.subscribe((folder) => {
      this.folder = new Folder(
        folder.title,
        folder.displaySrc,
        folder.imageSrcs
      );
      this.zeroOutArray();
      this.getCurrentPhotos();
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
  getCurrentPhotos() {
    //Set all of the images
    let srcArray: string[] = [];
    this.photoService.albumPhotos.subscribe((photos) => {
      photos.forEach((photo) => srcArray.push(photo.path));
    });
    this.observer = new Observable((obs) => {
      obs.next(srcArray);
    });
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
    this.masonryItems = [];
    this.spinner = true;
    if (this.items) {
      this.items.forEach((item) => {
        this.hideElement(item);
      });
    }
    this.folderOrder = [];
    window.scrollTo(0, 0);
  }
  showImage(item) {
    this.renderCount++;
    // Determinate spinner option this.value = Math.round((this.renderCount/this.folderOrder.length) * 100);
    if (this.renderCount === this.folderOrder.length) {
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
