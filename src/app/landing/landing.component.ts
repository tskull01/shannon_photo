import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef,  ViewChild, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { Folder } from '../folder';
import { PhotoDeliveryService } from '../photo-delivery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { TweenLite, Power0} from 'gsap'; 
import { FolderBuilderService } from '../folder-builder.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
selectionMade:boolean = false;
mobile:boolean;
folderDisplays:any[] = []; 
@ViewChildren('folders')foldersDom:QueryList<ElementRef>
@ViewChild(CdkScrollable)container:CdkScrollable; 
@Input('folders')folders:Folder[]; 
folderPromise:Promise<any>;  
photoTransform:string;
folderElements: Element[] = [];
folderLimit:number; 
folderTween:TweenLite;
  constructor(private photoDelivery:PhotoDeliveryService, private router:Router, private route:ActivatedRoute,
    private scroller:ScrollDispatcher, private renderer: Renderer2, private folderService:FolderBuilderService) {}

  ngOnInit(): void {
    this.router.navigate([`./`], { relativeTo: this.route });
    this.photoTransform = this.setPhotoTransform(); 
    window.screen.width < 450 ? this.mobile = true : this.mobile = false; 
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
ngOnDestroy(): void {
  this.scroller.deregister(this.container);
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
        for(let element of this.folderElements){
          TweenLite.to(element,1, {opacity: 0 }).play(); 
        }
        this.selectionMade = true;
      this.photoDelivery.setFolder(f); 
      }
    }
  } 
  setPaths(){
    //Doing for loop twice to create a second set of images for scroll effect
    for(let i = 0; i < 2; i++){
      for(let f of this.folders){
        if(window.screen.width < 500){
          this.folderDisplays.push({name: f.displayName, path: `../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`})
        } else if(window.screen.width < 1000 && window.screen.width > 501){
          this.folderDisplays.push({name: f.displayName, path: `../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`})
        } else{
          this.folderDisplays.push({name: f.displayName, path: `../../assets/images/${f.name}/${f.name}(${f.displayPhoto}).jpg${this.photoTransform}`})
        }
      }
    }
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
    var scrollSpeed = 60;
    let containerRef = this.container.getElementRef();
    containerRef.nativeElement.scrollLeft -= (delta * scrollSpeed);
  }
  fadeIn(i){
    if(i === this.folderDisplays.length - 1){
      for(let element of this.folderElements){
        this.renderer.removeClass(element, 'hide');
        TweenLite.fromTo(element, 1,{opacity:0},{opacity:0.95, ease: Power0.easeIn}). play();
      }
    }
  }
}

