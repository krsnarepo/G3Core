import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWorkerComponent } from './header-worker.component';

describe('HeaderWorkerComponent', () => {
  let component: HeaderWorkerComponent;
  let fixture: ComponentFixture<HeaderWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderWorkerComponent]
    });
    fixture = TestBed.createComponent(HeaderWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
