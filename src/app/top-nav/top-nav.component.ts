import { Component, ElementRef, ViewChild, OnInit, Input } from "@angular/core";
import { PhotoDeliveryService } from "../photo-delivery.service";
import { FolderBuilderService } from "../folder-builder.service";
import { Folder } from "../folder";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-nav",
  templateUrl: "./top-nav.component.html",
  styleUrls: ["./top-nav.component.css"],
})
export class TopNavComponent implements OnInit {
  @ViewChild("fullnav") wrapper: ElementRef;
  navFull: boolean = true;
  photo: boolean = false;
  selection: number = 1;
  folder: Folder;
  folderPromise: any;
  @Input("folders") folders: Folder[];
  constructor(
    private folderService: FolderBuilderService,
    private router: Router
  ) {}

  ngOnInit() {
    window.screen.width < 500
      ? this.router.navigate([""])
      : console.log("not mobile");
    this.folderService.folderSubject.subscribe((folder) => {
      this.folder = folder;
    });
  }
  setFolder(folder) {
    console.log(folder);
    this.folderService.setFolderSubject(folder);
  }
}
