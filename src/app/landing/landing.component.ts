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
import { TweenLite, Power0 } from "gsap";
import { FolderBuilderService } from "../folder-builder.service";
import { Subscription, Observable, fromEvent, Subject } from "rxjs";
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
  @Input("folders") folders: Folder[];
  constructor(
    private photoDelivery: PhotoDeliveryService,
    private router: Router,
    private renderer: Renderer2,
    private folderService: FolderBuilderService
  ) {}

  ngOnInit(): void {
    // this.router.navigate([`./`], { relativeTo: this.route });
    this.photoTransform = this.setPhotoTransform();
    window.screen.width < 500 ? (this.mobile = true) : (this.mobile = false);
    window.screen.width < 500 ? console.log("mobile") : console.log("desktop");
    this.folderSub = this.folderService.folderSubject.subscribe((folder) => {
      this.folder = folder;
    });
    this.setPaths();

    this.folderLimit = this.folders.length;
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.folderElements = this.foldersDom.map((folder) => folder.nativeElement);
    this.containerElem = this.container.nativeElement;
    this.scroller = fromEvent<any>(this.container.nativeElement, "scroll")
      .pipe(
        throttleTime(30),
        takeUntil(this.notifier),
        tap(() => this.checkPosition())
      )
      .subscribe((scroll) => {
        //console.log(scroll);
      });
  }

  checkPosition() {
    if (
      this.containerElem.scrollLeft >=
      this.folderElements[
        this.folderElements.length - 1
      ].getBoundingClientRect().right
    ) {
      this.containerElem.scrollLeft = 0;
    }
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
    console.log("folder Selected");
    let holder = folder.split("/");
    this.mobile ? this.router.navigate([`./mobileDisplay`]) : null;
    for (let f of this.folders) {
      if (f.title === holder[4]) {
        console.log("matched");
        for (let element of this.folderElements) {
          TweenLite.to(element, 1, { opacity: 0 }).play();
        }
        this.notifier.complete();
        this.scroller.unsubscribe();
        this.selectionMade = true;
        this.photoDelivery.setFolder(f);
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
  scrollHandle(e: WheelEvent) {
    let delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    let scrollSpeed = 30;
    let containerRef = <Element>this.container.nativeElement;
    containerRef.scrollLeft -= delta * scrollSpeed;
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
