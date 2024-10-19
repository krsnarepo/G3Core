import { TestBed } from '@angular/core/testing';

import { ServiceConfirmationService } from './service-confirmation.service';

describe('ServiceConfirmationService', () => {
  let service: ServiceConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
