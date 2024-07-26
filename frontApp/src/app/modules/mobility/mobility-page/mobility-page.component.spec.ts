import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityPageComponent } from './mobility-page.component';

describe('MobilityPageComponent', () => {
  let component: MobilityPageComponent;
  let fixture: ComponentFixture<MobilityPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobilityPageComponent]
    });
    fixture = TestBed.createComponent(MobilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
