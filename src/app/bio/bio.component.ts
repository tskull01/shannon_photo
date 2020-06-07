import { Component, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { TweenLite } from "gsap";
import { map } from "rxjs/operators";

@Component({
  selector: "app-bio",
  templateUrl: "./bio.component.html",
  styleUrls: ["./bio.component.css"],
})
export class BioComponent {
  @ViewChildren("companies") companyDom: QueryList<ElementRef>;
  firstLogos: string[] = [
    "../../assets/extras/black_diamond.png",
    "../../assets/extras/moosejaw.png",
    "../../assets/extras/rivian.png",
    "../../assets/extras/shefit.png",
  ];
  secondLogos: string[] = [
    "../../assets/extras/redbull.png",
    "../../assets/extras/walmart.png",
    "../../assets/extras/sony.png",
    "../../assets/extras/sorel.png",
  ];
  companies: string[] = [...this.firstLogos];
  observer: BehaviorSubject<string[]> = new BehaviorSubject(this.companies);
  first: boolean = false;

  constructor() {}
  /* Function wait and push emits an obesrvable every 5 seconds to changeCompanies function
 which checks current array and switches it to the other logos */
  ngAfterViewInit(): void {
    this.changeCompanies();
    this.waitAndPush().subscribe(() =>
      this.companyDom.forEach((element) => {
        TweenLite.fromTo(
          element.nativeElement,
          1,
          { opacity: 0 },
          { opacity: 1 }
        ).play();
      })
    );
  }

  changeCompanies() {
    this.waitAndPush().subscribe((companyArray) => {
      companyArray = [];
      if (this.first) {
        companyArray.push(...this.firstLogos);
        this.first = false;
      } else {
        companyArray.push(...this.secondLogos);
        this.first = true;
      }
      this.observer.next(companyArray);
    });
  }
  waitAndPush(): Observable<string[]> {
    return interval(5000).pipe(map((x) => this.companies));
  }
}
