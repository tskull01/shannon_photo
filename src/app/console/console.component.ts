import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FolderBuilderService } from "../folder-builder.service";
import { InitOptions, init, open } from "netlify-identity-widget";
import { CMS } from "netlify-cms";
@Component({
  selector: "app-console",
  templateUrl: "./console.component.html",
  styleUrls: ["./console.component.css"],
})
export class ConsoleComponent implements OnInit {
  @ViewChild("container") container: ElementRef;

  constructor(private folderService: FolderBuilderService) {}

  ngOnInit(): void {
    //
    this.folderService.getAllMarkdown();
    init();
    open();
  }
}
