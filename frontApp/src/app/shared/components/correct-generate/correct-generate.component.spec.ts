import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectGenerateComponent } from './correct-generate.component';

describe('CorrectGenerateComponent', () => {
  let component: CorrectGenerateComponent;
  let fixture: ComponentFixture<CorrectGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectGenerateComponent]
    });
    fixture = TestBed.createComponent(CorrectGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
