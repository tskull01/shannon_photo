import { Component, OnInit, ViewChild } from "@angular/core";
import { MobileDisplayComponent } from "../mobile-display/mobile-display.component";
import { FolderBuilderService } from "../folder-builder.service";
import { Folder } from "../folder";
import { PhotoDeliveryService } from "../photo-delivery.service";

@Component({
  selector: "app-mobile-nav",
  templateUrl: "./mobile-nav.component.html",
  styleUrls: ["./mobile-nav.component.css"],
})
export class MobileNavComponent {
  folder: Folder;
  @ViewChild("display") displayComponent: MobileDisplayComponent;
  constructor(
    private folderService: FolderBuilderService,
    private photoDelivery: PhotoDeliveryService
  ) {}

  ngOnInit(): void {
    console.log("mobile nav init");
    this.folderService.folderSubject.subscribe((folder) => {
      this.folder = folder;
    });
  }
  setSelection(folder) {
    this.photoDelivery.setFolder(folder);
  }
}
