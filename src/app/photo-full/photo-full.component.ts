import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { PhotoDeliveryService } from '../photo-delivery.service'; 
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesizeService } from '../filesize.service';
@Component({
  selector: 'app-photo-full',
  templateUrl: './photo-full.component.html',
  styleUrls: ['./photo-full.component.css']
})
export class PhotoFullComponent implements OnInit {
  publicId: string;
  @Output() return = new EventEmitter();
  filesizes:any; 
  folderLimit:number; 
  constructor(private photoService:PhotoDeliveryService, private maticon:MatIconRegistry, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.publicId = this.photoService.getPhoto(); 
    this.photoService.setFolderMax(); 
    this.maticon.addSvgIcon('grid',this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/grid_icon.svg'));
  }
  increaseId(){
    this.photoService.increaseId();
    this.publicId = this.photoService.getPhoto(); 
  }
  decreaseId(){
    this.photoService.decreaseId();
    this.publicId = this.photoService.getPhoto(); 
  }
  goBack(){
    this.return.emit();
  }
}
