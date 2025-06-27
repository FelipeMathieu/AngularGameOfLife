import { TestBed } from '@angular/core/testing';

import { CreatureReducersService } from './creature-reducers.service';

describe('CreatureReducersService', () => {
  let service: CreatureReducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatureReducersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
