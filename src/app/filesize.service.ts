import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FilesizeService {
sizes:any;
  constructor(private http:HttpClient) { }

  fileSizes(){
    return this.http.get('https://keen-colden-282a59.netlify.app/.netlify/large-media');
  }
  folders(){
    return this.http.get('https://keen-colden-282a59.netlify.app/.netlify/large-media');
  }
}
