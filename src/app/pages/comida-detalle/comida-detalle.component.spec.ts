import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaDetalleComponent } from './comida-detalle.component';

describe('ComidaDetalleComponent', () => {
  let component: ComidaDetalleComponent;
  let fixture: ComponentFixture<ComidaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComidaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
