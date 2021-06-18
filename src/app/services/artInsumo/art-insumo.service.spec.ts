import { TestBed } from '@angular/core/testing';

import { ArtInsumoService } from './art-insumo.service';

describe('ArtInsumoService', () => {
  let service: ArtInsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtInsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
