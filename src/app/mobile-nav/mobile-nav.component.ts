import { Component, ViewChild, Input } from "@angular/core";
import { MobileDisplayComponent } from "../mobile-display/mobile-display.component";
import { FolderBuilderService } from "../folder-builder.service";
import { Folder } from "../folder";

@Component({
  selector: "app-mobile-nav",
  templateUrl: "./mobile-nav.component.html",
  styleUrls: ["./mobile-nav.component.css"],
})
export class MobileNavComponent {
  folder: Folder;
  @ViewChild("display") displayComponent: MobileDisplayComponent;
  @Input("folders") folders: Folder[];
  constructor(private folderService: FolderBuilderService) {}

  ngOnInit(): void {
    console.log("mobile nav init");
    this.folderService.folderSubject.subscribe((folder) => {
      this.folder = folder;
    });
  }
  setFolder(folder) {
    this.folderService.setFolderSubject(folder);
  }
}
