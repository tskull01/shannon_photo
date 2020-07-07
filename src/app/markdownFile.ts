export class MarkdownFile {
  name: string;
  downloadUrl: string;

  constructor(name: string, downloadUrl: string) {
    this.name = name;
    this.downloadUrl = downloadUrl;
  }
}
