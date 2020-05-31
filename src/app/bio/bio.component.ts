import { Component, ViewChildren, QueryList, ElementRef, SimpleChanges} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TweenLite, Power0} from 'gsap'; 
@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent {
  @ViewChildren('companies')companyDom:QueryList<ElementRef>;
  firstLogos:string[] = ['../../assets/extras/black_diamond.png','../../assets/extras/moosejaw.png',
  '../../assets/extras/rivian.png','../../assets/extras/shefit.png'];
  secondLogos:string[] = ['../../assets/extras/redbull.png','../../assets/extras/walmart.png',
  '../../assets/extras/sony.png','../../assets/extras/sorel.png']
  companies:string[] = this.firstLogos; 
  observer:BehaviorSubject<string[]> = new BehaviorSubject(this.companies);
  first: boolean = true;  

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.waitAndPush();
  }
 ngAfterViewChecked(): void {
   //Called after every check of the component's view. Applies to components only.
   //Add 'implements AfterViewChecked' to the class.
   console.log('opacity to 1')
   this.companyDom.changes.subscribe((change) => {
    this.companyDom.forEach((element) => {
      TweenLite.to(element.nativeElement,1, {opacity: 1 }).play(); 
    })
  })
 }
  changeCompanies(value:string[]){
    this.companyDom.forEach((element) => {
      TweenLite.to(element.nativeElement,1, {opacity: 0 }).play(); 
    })
    this.observer.next(value);
    this.waitAndPush();
  }
  waitAndPush(){
    //Zero array
    console.log(this.companyDom)
    this.companies = [];
    if(this.first){this.companies.push(...this.firstLogos); this.first = false} else{this.companies.push(...this.secondLogos); this.first = true}; 
    setTimeout(() =>{
      console.log('inside set timeout')
      this.changeCompanies(this.companies);
    }, 5000)
  }
}
