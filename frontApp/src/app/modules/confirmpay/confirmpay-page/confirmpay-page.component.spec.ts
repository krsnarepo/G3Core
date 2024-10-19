import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpayPageComponent } from './confirmpay-page.component';

describe('ConfirmpayPageComponent', () => {
  let component: ConfirmpayPageComponent;
  let fixture: ComponentFixture<ConfirmpayPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmpayPageComponent]
    });
    fixture = TestBed.createComponent(ConfirmpayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
