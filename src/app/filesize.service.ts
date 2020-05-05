import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FilesizeService {
sizes:any;
  constructor(private http:HttpClient) { }

  fileSizes(){
    return this.http.get('.netlify/functions/filesize');
  }
  folders(){
    return this.http.get('.netlify/functions/getfolders');
  }
}
