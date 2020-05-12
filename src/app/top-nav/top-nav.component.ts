import { Component, ViewChildren, ElementRef, Renderer2, QueryList,ViewChild, OnInit, Input } from '@angular/core';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { FolderBuilderService } from '../folder-builder.service';
import { Folder } from '../folder';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
@ViewChildren('hidden') hiddenElements:QueryList<ElementRef>;
@ViewChild('folderList') folderList:ElementRef; 
@ViewChild('grid') gridContainer:ElementRef; 
@ViewChild('fullnav') wrapper:ElementRef; 
navFull:boolean = true; 
photo: boolean = false;
selection:number = 1;
@Input('folders')folders:Folder[];  
folderPromise:any;

  constructor(private renderer:Renderer2, private photoDelivery:PhotoDeliveryService, private folderService:FolderBuilderService) { }

  ngOnInit(){
  console.log(this.folders);
  }

  photoSelected(){
  this.photo = true;
    this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','50% 50%');
    this.renderer.setStyle(this.wrapper.nativeElement,'height','18vh');
  }
  setFolder(folder){
    console.log(folder)
    this.photoDelivery.setFolder(folder);
  }
  navSelection(num:number){
    this.selection = num; 
    if(num !== 1){
      this.photo = false;
      this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','100%');
      this.renderer.setStyle(this.wrapper.nativeElement,'height','12vh');
    }
  }
  selectDisplay(){
    this.selection = 5;
    this.hiddenElements.forEach(e => {
      this.renderer.addClass(e.nativeElement, 'hide');
    })
    this.renderer.setStyle(this.gridContainer.nativeElement,'grid-template-rows','100%');
      this.renderer.setStyle(this.wrapper.nativeElement,'height','12vh');
  }
  async getFolders(){
    await this.folderService.getFolders().then((folders) => {
      console.log(folders);
      return folders;
    });
  }
}
