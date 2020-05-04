import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFullComponent } from './photo-full.component';

describe('PhotoFullComponent', () => {
  let component: PhotoFullComponent;
  let fixture: ComponentFixture<PhotoFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
