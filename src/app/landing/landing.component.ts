import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../folder';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
selectionMade:boolean = false;
mobile:boolean;
folderDisplays:string[] = []; 
@Input('folders')folders:Folder[]; 
  constructor(private photoDelivery:PhotoDeliveryService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate([`./`], { relativeTo: this.route });
    window.screen.width < 450 ? this.mobile = true : this.mobile = false; 
   this.folderDisplays.length < 1 ? this.setPaths() : console.log('paths set');
  }

  selectFolder(folder){
    let holder = folder.split('/'); 
    for(let f of this.folders){
      if(f.name === holder[4]){
        console.log('matched');
        console.log(f)
      this.photoDelivery.setFolder(f); 
      this.selectionMade = true;
      }
    }
  } 
  setPaths(){
    console.log(this.folders)
      for(let f of this.folders){
        this.folderDisplays.push(`../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg?nf_resize=fit&w=400`)
      }
  }
}
