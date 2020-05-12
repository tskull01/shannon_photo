import { Component, OnInit } from '@angular/core';
import { PhotoDeliveryService } from '../photo-delivery.service';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  folders:any;
  folder:any;
  constructor(private photoService:PhotoDeliveryService) {
    this.photoService.folderChange.subscribe((folder) => {
      console.log(folder.name)
      this.folder = folder;
     })
   }

  ngOnInit(): void {
   console.log(this.folder)
  }

}
