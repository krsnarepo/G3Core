import { TestBed } from '@angular/core/testing';

import { GenerateDocumentService } from './generate-document.service';

describe('GenerateDocumentService', () => {
  let service: GenerateDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
