import { Component, ViewChildren, ElementRef, Renderer2, QueryList,ViewChild, OnInit, Input } from '@angular/core';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { FolderBuilderService } from '../folder-builder.service';
import { Folder } from '../folder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit { 
@ViewChild('fullnav') wrapper:ElementRef; 
navFull:boolean = true; 
photo: boolean = false;
selection:number = 1;
folders:Folder[] = [];  
folderPromise:any;

  constructor(private photoDelivery:PhotoDeliveryService, private folderService:FolderBuilderService, private router: Router) { }

  ngOnInit(){
    window.screen.width < 500 ? this.router.navigate(['']) : console.log('not mobile'); 
  this.folderService.folderSubject.subscribe((folders) => {
    console.log(folders)
    this.folders = folders; 
    console.log(this.folders)
  })
  }
  setFolder(folder){
    console.log(folder)
    this.photoDelivery.setFolder(folder);
  }
  navSelection(num:number){
    this.selection = num; 
  }
}
