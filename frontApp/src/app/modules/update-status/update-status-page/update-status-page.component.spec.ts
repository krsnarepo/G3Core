import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusPageComponent } from './update-status-page.component';

describe('UpdateStatusPageComponent', () => {
  let component: UpdateStatusPageComponent;
  let fixture: ComponentFixture<UpdateStatusPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusPageComponent]
    });
    fixture = TestBed.createComponent(UpdateStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
