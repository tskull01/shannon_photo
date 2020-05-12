import { TestBed } from '@angular/core/testing';

import { FolderBuilderService } from './folder-builder.service';

describe('FolderBuilderService', () => {
  let service: FolderBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
