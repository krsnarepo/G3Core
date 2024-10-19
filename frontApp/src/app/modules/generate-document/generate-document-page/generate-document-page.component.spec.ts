import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDocumentPageComponent } from './generate-document-page.component';

describe('GenerateDocumentPageComponent', () => {
  let component: GenerateDocumentPageComponent;
  let fixture: ComponentFixture<GenerateDocumentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateDocumentPageComponent]
    });
    fixture = TestBed.createComponent(GenerateDocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
