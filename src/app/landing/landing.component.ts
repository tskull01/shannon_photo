import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef,  ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Folder } from '../folder';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
selectionMade:boolean = false;
mobile:boolean;
folderDisplays:string[] = []; 
setTween: any; 
@ViewChildren('folders')foldersDom:QueryList<ElementRef>
@ViewChild(CdkScrollable)container:CdkScrollable; 
@Input('folders')folders:Folder[]; 
photoTransform:string;
folderElements: Element[] = [];
folderLimit:number; 

  constructor(private photoDelivery:PhotoDeliveryService, private router:Router, private route:ActivatedRoute,
    private scroller:ScrollDispatcher) {}

  ngOnInit(): void {
    this.router.navigate([`./`], { relativeTo: this.route });
    this.photoTransform = this.setPhotoTransform(); 
    window.screen.width < 450 ? this.mobile = true : this.mobile = false; 
   this.folderDisplays.length < 1 ? this.setPaths() : console.log('paths set');
   this.setPaths();
   this.folderLimit = this.folders.length;
  }
ngAfterViewChecked(): void {

  this.folderElements = this.foldersDom.map((folder) => folder.nativeElement)
 //If scrollX equal to last image before dummy image right edge set scrollLeft on the container to 0 otherwise add to scroll left;
 this.scroller.scrolled().subscribe((scroll) => {
  this.container.elementScrolled().subscribe((event) => {
    event.preventDefault();
   let containerRef =  this.container.getElementRef();
    if(containerRef.nativeElement.scrollLeft >= this.folderElements[this.folderElements.length - 1].getBoundingClientRect().right){
      containerRef.nativeElement.scrollLeft = 0; 
    }
  })
 })
}
setPhotoTransform(){
let transform = '';
if(window.screen.width < 500){
  transform = '?nf_resize=fit&w=400';
}else if(window.screen.width < 1000 && window.screen.width > 501){
  transform = '?nf_resize=fit&w=800';
}else if(window.screen.width > 1000){
  transform = '?nf_resize=fit&w=1000';
}
return transform; 
}
selectFolder(folder){
  console.log('folder Selected')
    let holder = folder.split('/'); 
    for(let f of this.folders){
      if(f.name === holder[4]){
        console.log('matched');
        console.log(f)
        this.selectionMade = true;
      this.photoDelivery.setFolder(f); 
      }
    }
  } 
  setPaths(){
    console.log(this.folders)
      for(let f of this.folders){
        if(window.screen.width < 500){
          this.folderDisplays.push(`../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`)
        } else if(window.screen.width < 1000 && window.screen.width > 501){
          this.folderDisplays.push(`../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`)
        } else if(window.screen.width > 1000){
          this.folderDisplays.push(`../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`)
        }
      }
  }
  onScroll(){
    console.log('scrolling')
  }
scrollHorizontally(e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    var scrollSpeed = 60; // Janky jank <<<<<<<<<<<<<<
    document.documentElement.scrollLeft -= (delta * scrollSpeed);
    document.body.scrollLeft -= (delta * scrollSpeed);
    e.preventDefault();
  }
  scrollHandle(e:WheelEvent){
    var delta = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)));
    var scrollSpeed = 60; // Janky jank <<<<<<<<<<<<<<
    let containerRef = this.container.getElementRef();
    containerRef.nativeElement.scrollLeft -= (delta * scrollSpeed);
  }
}

