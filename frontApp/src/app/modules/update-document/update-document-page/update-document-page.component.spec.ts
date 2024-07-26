import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentPageComponent } from './update-document-page.component';

describe('UpdateDocumentPageComponent', () => {
  let component: UpdateDocumentPageComponent;
  let fixture: ComponentFixture<UpdateDocumentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDocumentPageComponent]
    });
    fixture = TestBed.createComponent(UpdateDocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
