import { TestBed } from '@angular/core/testing';

import { MdopagoService } from './mdopago.service';

describe('MdopagoService', () => {
  let service: MdopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
