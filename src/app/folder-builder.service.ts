import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MarkdownFile } from "./markdownFile";
import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject } from "rxjs";
import { Folder } from "./folder";
import { GitApiResponse } from "./gitApiResponse";
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from "@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector";
@Injectable({
  providedIn: "root",
})
export class FolderBuilderService {
  markdownObjects: MarkdownFile[] = [];
  textFiles: string[] = [];
  numberOfFolders: number;
  buildingFolders: Folder[] = [];
  allFoldersSubject: BehaviorSubject<Folder[]> = new BehaviorSubject(
    this.buildingFolders
  );
  folderSubject: BehaviorSubject<Folder> = new BehaviorSubject(
    this.buildingFolders[0]
  );
  //REGULAR EXPRESSIONS FOR TITLE DISPLAYPHOTO AND IMAGES
  titleRegex: RegExp = new RegExp('(?<=")(.*?)(?=")');
  /* tslint:disable */

  displayRegex: RegExp = new RegExp("(?<=displayPhoto:\\s)(.*?)\\s"); // tslint:disable-line
  /* tslint:enable */

  imagesRegex: RegExp = new RegExp("(?<=image:\\s)(.*?)\\s");

  constructor(
    private http: HttpClient,
    private transferStateService: TransferStateService
  ) {}

  /* ACTUAL CODE UNDER HERE  */
  translateToText(markdownObjects: MarkdownFile[]) {
    console.log(markdownObjects);
    markdownObjects.forEach((markdownFile) => {
      this.http
        .get(markdownFile.downloadUrl, { responseType: "text" })
        .subscribe((result: string) => {
          console.log(result);
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
      console.log("inside if passed tests");
      let title = this.titleRegex.exec(result)[0];
      let displayPhoto = this.displayRegex.exec(result)[0];
      console.log(displayPhoto);
      let imagesText = this.imagesRegex.exec(result)[0].split(",");
      console.log(imagesText);
      this.buildingFolders.push(new Folder(title, displayPhoto, imagesText));
      console.log(this.buildingFolders);
      this.allFoldersSubject.next(this.buildingFolders);
      this.folderSubject.subscribe((value) => {
        console.log(value);
      });
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
        console.log(result);
        result.forEach((result, i) => {
          console.log(result);
          this.markdownObjects.push(
            new MarkdownFile(result.name, result.download_url)
          );
        });
        this.translateToText(this.markdownObjects);
      });
  }
}
//helpful file paths
//"https://api.github.com/repos/tskull01/shannon_photo/contents/src/assets/images/uploads/test.md"
//"https://api.github.com/repos/tskull01/shannon_photo/contents/src/assets/images/uploads"
//https://raw.githubusercontent.com/tskull01/shannon_photo/master/src/assets/images/uploads/test.md?ref=master
