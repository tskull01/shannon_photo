import { Component, OnInit } from '@angular/core';
import { FilesizeService } from '../filesize.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  folders:any;
  constructor( private fileService:FilesizeService) { }

  ngOnInit(): void {
    this.fileService.folders().subscribe((folders) =>{
      let string = folders['message'];
      this.folders = string.split(',')
    })
  }

}
