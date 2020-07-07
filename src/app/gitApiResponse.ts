export class GitApiResponse {
  name: string;
  download_url: string;
  constructor(name: string, download_url: string) {
    this.name = name;
    this.download_url = download_url;
  }
}
