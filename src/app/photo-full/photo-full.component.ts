import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { PhotoDeliveryService } from "../photo-delivery.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-photo-full",
  templateUrl: "./photo-full.component.html",
  styleUrls: ["./photo-full.component.css"],
})
export class PhotoFullComponent implements OnInit {
  publicId: string;
  @ViewChild("photo") photoRef: ElementRef;
  @ViewChild("container") container: ElementRef;
  @Output() return = new EventEmitter();
  filesizes: any;
  folderLimit: number;
  constructor(
    private photoService: PhotoDeliveryService,
    private renderer: Renderer2,
    private maticon: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.publicId = this.photoService.getPhoto();
    this.maticon.addSvgIcon(
      "grid",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icons/grid_icon.svg"
      )
    );
  }

  increaseId(e) {
    e.preventDefault();
    this.photoService.increaseId();
    this.publicId = this.photoService.getPhoto();
  }
  decreaseId(e) {
    e.preventDefault();
    this.photoService.decreaseId();
    this.publicId = this.photoService.getPhoto();
  }
  goBack() {
    this.return.emit();
  }
  easeIn() {
    this.renderer.removeClass(this.photoRef.nativeElement, "hidden");
    this.renderer.addClass(this.photoRef.nativeElement, "loaded");
  }
}
