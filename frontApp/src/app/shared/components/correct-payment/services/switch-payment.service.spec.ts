import { TestBed } from '@angular/core/testing';

import { SwitchPaymentService } from './switch-payment.service';

describe('SwitchPaymentService', () => {
  let service: SwitchPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
