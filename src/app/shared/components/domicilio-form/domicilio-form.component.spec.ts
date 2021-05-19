import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilioFormComponent } from './domicilio-form.component';

describe('DomicilioFormComponent', () => {
  let component: DomicilioFormComponent;
  let fixture: ComponentFixture<DomicilioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomicilioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
