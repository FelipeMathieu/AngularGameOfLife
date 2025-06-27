import { TestBed } from '@angular/core/testing';

import { VerifyCreaturesService } from './verify-creatures.service';

describe('VerifyCreaturesService', () => {
  let service: VerifyCreaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCreaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
