import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FolderBuilderService } from '../folder-builder.service';
import { Folder } from '../folder';
import {InitOptions,init,open } from 'netlify-identity-widget'; 

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
@ViewChild('container')container:ElementRef; 
  folders:Folder[];
  folder:any;
 addingFolder:boolean;
 folderView:boolean; 
 netlifyId: InitOptions; 
  constructor(private folderService: FolderBuilderService) {
  this.folderService.folderSubject.subscribe(
    (folders) => this.folders = folders
  )
   }

  ngOnInit(): void { 
  init(); 
  open(); 
  }

}
