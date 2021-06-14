import { TestBed } from '@angular/core/testing';

import { RubartService } from './rubart.service';

describe('RubartService', () => {
  let service: RubartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
