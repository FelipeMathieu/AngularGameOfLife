import { TestBed } from '@angular/core/testing';

import { UiReducersService } from './ui-reducers.service';

describe('UiReducersService', () => {
  let service: UiReducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiReducersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
