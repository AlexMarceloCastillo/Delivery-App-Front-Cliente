import { TestBed } from '@angular/core/testing';

import { ArtmanufactService } from './artmanufact.service';

describe('ArtmanufactService', () => {
  let service: ArtmanufactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtmanufactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
