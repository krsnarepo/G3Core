import { TestBed } from '@angular/core/testing';

import { UpdateDocumentService } from './update-document.service';

describe('UpdateDocumentService', () => {
  let service: UpdateDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
