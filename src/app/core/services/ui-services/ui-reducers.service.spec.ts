import { TestBed } from '@angular/core/testing';

import { UIReducersService } from './ui-reducers.service';

describe('UiReducersService', () => {
  let service: UIReducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIReducersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
