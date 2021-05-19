import { TestBed } from '@angular/core/testing';

import { FormDataBuildService } from './form-data-build.service';

describe('FormDataBuildService', () => {
  let service: FormDataBuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataBuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
