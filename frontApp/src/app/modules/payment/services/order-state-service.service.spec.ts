import { TestBed } from '@angular/core/testing';

import { OrderStateServiceService } from './order-state-service.service';

describe('OrderStateServiceService', () => {
  let service: OrderStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
