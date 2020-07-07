import { Component, OnInit } from "@angular/core";
import { FolderBuilderService } from "./folder-builder.service";
import { Folder } from "./folder";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

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

  constructor(
    private folderService: FolderBuilderService,
    private router: Router
  ) {}
  ngOnInit() {
    //Gets folders from behavior subject in service and then passes them to the landing component
    this.router.navigate([""]);
    this.loading = true;
    this.folderService.getAllMarkdown();
    this.subscriber = this.folderService.folderSubject.subscribe((folder) => {
      console.log(folder);
      this.folder = folder;
      this.loading = false;
      console.log(this.loading);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
