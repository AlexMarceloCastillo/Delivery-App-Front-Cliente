import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoadComponent } from './spinner-load.component';

describe('SpinnerLoadComponent', () => {
  let component: SpinnerLoadComponent;
  let fixture: ComponentFixture<SpinnerLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
