import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTablePageComponent } from './price-table-page.component';

describe('PriceTablePageComponent', () => {
  let component: PriceTablePageComponent;
  let fixture: ComponentFixture<PriceTablePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceTablePageComponent]
    });
    fixture = TestBed.createComponent(PriceTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
