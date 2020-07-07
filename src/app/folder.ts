export class Folder {
  title: string;
  displaySrc: string;
  imageSrcs: string[];
  constructor(title: string, displaySrc: string, imageSrcs: string[]) {
    this.title = title;
    this.displaySrc = displaySrc;
    this.imageSrcs = imageSrcs;
  }
}
