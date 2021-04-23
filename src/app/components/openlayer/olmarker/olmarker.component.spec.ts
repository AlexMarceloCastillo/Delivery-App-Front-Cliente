import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlmarkerComponent } from './olmarker.component';

describe('OlmarkerComponent', () => {
  let component: OlmarkerComponent;
  let fixture: ComponentFixture<OlmarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlmarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
