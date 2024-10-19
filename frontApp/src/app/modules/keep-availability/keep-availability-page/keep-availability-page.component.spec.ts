import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepAvailabilityPageComponent } from './keep-availability-page.component';

describe('KeepAvailabilityPageComponent', () => {
  let component: KeepAvailabilityPageComponent;
  let fixture: ComponentFixture<KeepAvailabilityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeepAvailabilityPageComponent]
    });
    fixture = TestBed.createComponent(KeepAvailabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
