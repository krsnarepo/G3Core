import { TestBed } from '@angular/core/testing';

import { ConfirmPayService } from './confirm-pay.service';

describe('ConfirmPayService', () => {
  let service: ConfirmPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
