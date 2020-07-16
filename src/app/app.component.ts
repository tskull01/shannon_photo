import { Component, OnInit } from "@angular/core";
import { FolderBuilderService } from "./folder-builder.service";
import { Folder } from "./folder";
import { Router } from "@angular/router";
import { Subscription, Observable, interval } from "rxjs";
import { PhotoDeliveryService } from "./photo-delivery.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  mobile: boolean;
  loading: boolean;
  title = "ShannonPhoto";
  incoming: any;
  folder: Folder;
  subscriber: Subscription;
  folders: Folder[];
  retry: Observable<number>;
  constructor(
    private folderService: FolderBuilderService,
    private router: Router,
    private photoService: PhotoDeliveryService
  ) {}
  ngOnInit() {
    //Gets folders from behavior subject in service and then passes them to the landing component
    this.router.navigate([""]);
    this.loading = true;
    let waitForFolder = this.folderService.getAllMarkdown();
    waitForFolder.subscribe((waiting) => {
      console.log(waiting + "Behavior subject");
      waiting
        ? (this.subscriber = this.folderService.allFoldersSubject.subscribe(
            (folders) => {
              console.log("getting all folders");
              this.folders = folders;
              this.loading = false;
            }
          ))
        : null;
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
