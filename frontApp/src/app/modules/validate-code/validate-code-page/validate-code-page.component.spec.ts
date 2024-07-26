import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCodePageComponent } from './validate-code-page.component';

describe('ValidateCodePageComponent', () => {
  let component: ValidateCodePageComponent;
  let fixture: ComponentFixture<ValidateCodePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateCodePageComponent]
    });
    fixture = TestBed.createComponent(ValidateCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
