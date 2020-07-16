import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MarkdownFile } from "./markdownFile";
import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject } from "rxjs";
import { Folder } from "./folder";
import { GitApiResponse } from "./gitApiResponse";
@Injectable({
  providedIn: "root",
})
export class FolderBuilderService {
  markdownObjects: MarkdownFile[] = [];
  textFiles: string[] = [];
  numberOfFolders: number;
  buildingFolders: Folder[] = [];
  waitForFolders: BehaviorSubject<boolean> = new BehaviorSubject(false);
  allFoldersSubject: BehaviorSubject<Folder[]> = new BehaviorSubject(
    this.buildingFolders
  );
  folderSubject: BehaviorSubject<Folder> = new BehaviorSubject(
    this.buildingFolders[0]
  );
  //REGULAR EXPRESSIONS FOR TITLE DISPLAYPHOTO AND IMAGES
  titleRegex: RegExp = new RegExp("(?<=title:\\s)(.*)");
  /* tslint:disable */

  displayRegex: RegExp = new RegExp("(?<=displayPhoto:\\s)(.*?)\\s"); // tslint:disable-line
  /* tslint:enable */

  imagesRegex: RegExp = new RegExp("(?<=galleryImages:\\s)([\\s\\S]*)(?=---)");

  constructor(
    private http: HttpClient,
    private transferStateService: TransferStateService
  ) {}
  setFolderSubject(folder: Folder) {
    this.folderSubject.next(folder);
  }
  /* ACTUAL CODE UNDER HERE  */
  translateToText(markdownObjects: MarkdownFile[]) {
    markdownObjects.forEach((markdownFile) => {
      this.http
        .get(markdownFile.downloadUrl, { responseType: "text" })
        .subscribe((result: string) => {
          this.parseText(result);
        });
    });
  }
  parseText(result: string) {
    //Adds the text files to the textFiles array
    if (
      this.titleRegex.test(result) &&
      this.displayRegex.test(result) &&
      this.imagesRegex.test(result)
    ) {
      let title = this.titleRegex.exec(result)[0];
      let displayPhoto = this.displayRegex.exec(result)[0];
      let imagesText = this.imagesRegex.exec(result)[0].trim().split("-");
      this.buildingFolders.push(new Folder(title, displayPhoto, imagesText));
      this.allFoldersSubject.next(this.buildingFolders);
      if (this.buildingFolders.length === this.numberOfFolders) {
        this.waitForFolders.next(true);
      }
    }
  }
  getAllMarkdown() {
    //Get all of the markdown files from a folder
    //take the download url from the git result
    this.http
      .get(
        "https://api.github.com/repos/tskull01/shannon_photo/contents/src/assets/images/uploads"
      )
      .subscribe((result: GitApiResponse[]) => {
        this.numberOfFolders = result.length;
        result.forEach((result, i) => {
          this.markdownObjects.push(
            new MarkdownFile(result.name, result.download_url)
          );
        });
        this.translateToText(this.markdownObjects);
      });
    return this.waitForFolders;
  }
}
//helpful file paths
//"https://api.github.com/repos/tskull01/shannon_photo/contents/src/assets/images/uploads/test.md"
//"https://api.github.com/repos/tskull01/shannon_photo/contents/src/assets/images/uploads"
//https://raw.githubusercontent.com/tskull01/shannon_photo/master/src/assets/images/uploads/test.md?ref=master
