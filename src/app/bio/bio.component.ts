import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent {

  firstLogos:string[] = ['/src/assets/extras/black_diamond.jpg','/src/assets/extras/moosejaw.png',
  '/src/assets/extras/rivian.png','/src/assets/extras/shefit.png'];
  secondLogos:string[] = ['/src/assets/extras/redbull.png','/src/assets/extras/walmart.png',
  '/src/assets/extras/sony.png','/src/assets/extras/sorel.png']
  companies:string[] = []; 
  observer:Observable<string[]>; 
  first: boolean = true;  
  constructor() { }

  changeCompanies(array){
    this.observer = new Observable((obs) => {
      obs.next(array);
    })
  }
  waitAndPush(){
    if(this.first){this.companies = this.firstLogos; this.first = false} else{this.companies = this.secondLogos; this.first = true}; 
    setInterval(() =>{
      this.changeCompanies(this.companies); 
      this.waitAndPush(); 
    }, 5000)
  }
}
