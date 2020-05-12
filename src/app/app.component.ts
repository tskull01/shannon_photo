import { Component, OnInit } from '@angular/core';
import { FolderBuilderService } from './folder-builder.service';
import { Folder } from './folder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobile:boolean;
  loading:boolean; 
  title = 'ShannonPhoto';
  incoming:any;
  folders:Folder[];

constructor(private folderService:FolderBuilderService){}
  ngOnInit(){
  this.loading = true;
  this.getFolders();
  }
 async getFolders(){
    this.folders = await this.folderService.getFolders();
    console.log('folders are here')
    this.loading = false;  
  }
}