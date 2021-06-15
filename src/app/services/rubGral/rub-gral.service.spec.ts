import { TestBed } from '@angular/core/testing';

import { RubGralService } from './rub-gral.service';

describe('RubGralService', () => {
  let service: RubGralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubGralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
