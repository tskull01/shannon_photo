import { TestBed } from '@angular/core/testing';

import { FilesizeService } from './filesize.service';

describe('FilesizeService', () => {
  let service: FilesizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
