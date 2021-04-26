import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidoContComponent } from './olvido-cont.component';

describe('OlvidoContComponent', () => {
  let component: OlvidoContComponent;
  let fixture: ComponentFixture<OlvidoContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidoContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidoContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
