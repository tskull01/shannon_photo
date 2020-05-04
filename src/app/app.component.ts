import { Component, OnInit } from '@angular/core';
import { FilesizeService } from './filesize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobile:boolean;
  title = 'ShannonPhoto';
incoming:any;
constructor(private fileService:FilesizeService){}
  ngOnInit(){
    this.fileService.folders().subscribe((folders) =>{
      console.log(folders);
    })
    window.screen.width < 450 ? this.mobile = true : this.mobile = false; 
  }
}