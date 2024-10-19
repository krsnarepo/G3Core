import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReceiptPageComponent } from './generate-receipt-page.component';

describe('GenerateReceiptPageComponent', () => {
  let component: GenerateReceiptPageComponent;
  let fixture: ComponentFixture<GenerateReceiptPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateReceiptPageComponent]
    });
    fixture = TestBed.createComponent(GenerateReceiptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
