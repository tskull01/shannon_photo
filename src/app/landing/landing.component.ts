import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  Renderer2,
} from "@angular/core";
import { Folder } from "../folder";
import { PhotoDeliveryService } from "../photo-delivery.service";
import { Router } from "@angular/router";
import { TweenLite, gsap, Power0 } from "gsap";
import { FolderBuilderService } from "../folder-builder.service";
import { Subscription, fromEvent, Subject } from "rxjs";
import { takeUntil, throttleTime, tap } from "rxjs/operators";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  selectionMade: boolean = false;
  mobile: boolean;
  folderDisplays: any[] = [];
  @ViewChildren("folderDom") foldersDom: QueryList<ElementRef>;
  @ViewChild("container") container: ElementRef<Element>;
  folderPromise: Promise<any>;
  photoTransform: string;
  folderElements: Element[] = [];
  folderLimit: number;
  folderTween: TweenLite;
  folderSub: Subscription;
  notifier = new Subject<void>();
  scroller: Subscription;
  containerElem: Element;
  folder: Folder;
  prevScroll: number = 0;
  currentXpercent: number = 0;
  @Input("folders") folders: Folder[];
  constructor(
    private photoDelivery: PhotoDeliveryService,
    private router: Router,
    private renderer: Renderer2,
    private folderService: FolderBuilderService
  ) {}

  ngOnInit(): void {
    // this.router.navigate([`./`], { relativeTo: this.route });
    //Responsive image requests
    this.photoTransform = this.setPhotoTransform();
    window.screen.width < 500 ? (this.mobile = true) : (this.mobile = false);
    window.screen.width < 500 ? console.log("mobile") : console.log("desktop");
    //Getting photo subcategories from markdown files
    this.folderSub = this.folderService.folderSubject.subscribe((folder) => {
      this.folder = folder;
    });
    //Setting the display image for each subcategory
    this.setPaths();
    this.folderLimit = this.folders.length;
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.folderElements = this.foldersDom.map((folder) => folder.nativeElement);
    this.containerElem = this.container.nativeElement;
    //Scroll event obs checks position of photos
    this.scroller = fromEvent<any>(this.container.nativeElement, "wheel")
      .pipe(
        throttleTime(50),
        takeUntil(this.notifier),
        tap((e) => this.logEvent(e)),
        tap((e) => this.checkPosition(e)),
        tap((e) => this.moveDisplays(e))
      )
      .subscribe((scroll) => {
        //console.log(scroll);
      });
  }

  checkPosition(e) {
    if (
      this.containerElem.scrollLeft >=
      this.folderElements[
        this.folderElements.length - 1
      ].getBoundingClientRect().right
    ) {
      this.containerElem.scrollLeft = 0;
    } else if (this.containerElem.scrollLeft === 0 && e.deltaY < -20) {
      this.containerElem.scrollLeft = this.containerElem.scrollWidth / 2;
    }
  }
  logEvent(e) {
    console.log(e.deltaY);
  }
  setPhotoTransform() {
    let transform = "";
    if (window.screen.width < 500) {
      transform = "?nf_resize=fit&w=400";
    } else if (window.screen.width < 1000 && window.screen.width > 501) {
      transform = "?nf_resize=fit&w=800";
    } else if (window.screen.width > 1000) {
      transform = "?nf_resize=fit&w=1000";
    }
    return transform;
  }
  selectFolder(folder, event) {
    console.log("folder Selected" + folder);
    this.mobile ? this.router.navigate([`./mobileDisplay`]) : null;
    for (let f of this.folders) {
      if (f.title === folder) {
        console.log("matched");
        for (let element of this.folderElements) {
          TweenLite.to(element, 1, { opacity: 0 }).play();
        }
        this.notifier.complete();
        this.scroller.unsubscribe();
        this.selectionMade = true;
        this.folderService.setFolderSubject(f);
      }
    }
  }
  setPaths() {
    //Doing for loop twice to create a second set of images for scroll effect
    for (let i = 0; i < 2; i++) {
      for (let f of this.folders) {
        if (window.screen.width < 500) {
          this.folderDisplays.push({
            name: f.title,
            path: `${f.displaySrc}${this.photoTransform}`,
          });
        } else if (window.screen.width < 1000 && window.screen.width > 501) {
          this.folderDisplays.push({
            name: f.title,
            path: `${f.displaySrc}${this.photoTransform}`,
          });
        } else {
          this.folderDisplays.push({
            name: f.title,
            path: `${f.displaySrc}${this.photoTransform}`,
          });
        }
      }
    }
  }
  moveDisplays(e) {
    e.preventDefault();
    if (e.deltaY > 0) {
      this.containerElem.scrollLeft += 30;
    } else {
      this.containerElem.scrollLeft -= 30;
    }
  }
  fadeIn(i) {
    if (i === this.folderDisplays.length - 1) {
      for (let element of this.folderElements) {
        this.renderer.removeClass(element, "hide");
        TweenLite.fromTo(
          element,
          1,
          { opacity: 0 },
          { opacity: 0.95, ease: Power0.easeIn }
        ).play();
      }
    }
  }
}
