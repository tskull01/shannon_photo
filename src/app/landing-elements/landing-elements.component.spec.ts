import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingElementsComponent } from './landing-elements.component';

describe('LandingElementsComponent', () => {
  let component: LandingElementsComponent;
  let fixture: ComponentFixture<LandingElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
