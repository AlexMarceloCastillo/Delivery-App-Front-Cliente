import { TestBed } from '@angular/core/testing';

import { TogglerService } from './toggler.service';

describe('TogglerServiceService', () => {
  let service: TogglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
