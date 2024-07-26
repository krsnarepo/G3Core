import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyPackagesPageComponent } from './classify-packages-page.component';

describe('ClassifyPackagesPageComponent', () => {
  let component: ClassifyPackagesPageComponent;
  let fixture: ComponentFixture<ClassifyPackagesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassifyPackagesPageComponent]
    });
    fixture = TestBed.createComponent(ClassifyPackagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
