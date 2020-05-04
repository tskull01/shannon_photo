import { TestBed } from '@angular/core/testing';

import { PhotoDeliveryService } from './photo-delivery.service';

describe('PhotoDeliveryService', () => {
  let service: PhotoDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
