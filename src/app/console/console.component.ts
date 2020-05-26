import { Component, OnInit } from '@angular/core';
import { FolderBuilderService } from '../folder-builder.service';
import { Folder } from '../folder';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  folders:Folder[];
  folder:any;
 addingFolder:boolean;
 folderView:boolean; 
  constructor(private folderService: FolderBuilderService) {
  this.folderService.returnAllFolders().then(
    (folders) => this.folders = folders
  )
   }

  ngOnInit(): void {
   console.log(this.folder)
  }

  createFolder(folderName){
   let newFolder = new Folder(this.getNextId(),this.formatFolderName(folderName),'',folderName,'1')
   this.folderService.addNewFolder(newFolder); 
  }

  getNextId(){
    return this.folders[this.folders.length].id + 1; 
  }
formatFolderName(name:string){
return name.toLowerCase().trim();
}
addFolder(){

}
}
