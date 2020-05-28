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
  folders:Folder[] = [];

constructor(private folderService:FolderBuilderService){}
  ngOnInit(){
  this.loading = true;
  this.waitForFolders(); 
  }
 async getFolders(){
    this.folders =<Folder[]> await this.folderService.returnAllFolders();
  }
 waitForFolders(){
this.getFolders().then(() => this.loading = false);
  }
}