import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlradioComponent } from './olradio.component';

describe('OlradioComponent', () => {
  let component: OlradioComponent;
  let fixture: ComponentFixture<OlradioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlradioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlradioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
