import { Component, OnInit } from '@angular/core';
import { FolderBuilderService } from './folder-builder.service';
import { Folder } from './folder';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  subcriber: Subscription;

constructor(private folderService:FolderBuilderService, private router:Router){}
  ngOnInit(){
    //let response = this.folderService.listSiteAssets(); 
    //console.log(response);
  this.router.navigate([''])
  this.loading = true;
  this.subcriber = this.folderService.folderSubject.subscribe((folders) => {
    if(folders.length > 1){
      console.log('inside if');
      console.log(folders)
    this.folders = folders; 
    this.loading = false; 
    this.subcriber.unsubscribe(); 
    console.log(this.loading)
    } else{
      this.folderService.folders(); 
      console.log('inside else')
    }
  })
}
}