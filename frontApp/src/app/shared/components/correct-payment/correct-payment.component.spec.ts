import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectPaymentComponent } from './correct-payment.component';

describe('CorrectPaymentComponent', () => {
  let component: CorrectPaymentComponent;
  let fixture: ComponentFixture<CorrectPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectPaymentComponent]
    });
    fixture = TestBed.createComponent(CorrectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
