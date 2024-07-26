import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormPageComponent } from './shipping-form-page.component';

describe('ShippingFormPageComponent', () => {
  let component: ShippingFormPageComponent;
  let fixture: ComponentFixture<ShippingFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingFormPageComponent]
    });
    fixture = TestBed.createComponent(ShippingFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
