import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListPageComponent } from './order-list-page.component';

describe('OrderListPageComponent', () => {
  let component: OrderListPageComponent;
  let fixture: ComponentFixture<OrderListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListPageComponent]
    });
    fixture = TestBed.createComponent(OrderListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});