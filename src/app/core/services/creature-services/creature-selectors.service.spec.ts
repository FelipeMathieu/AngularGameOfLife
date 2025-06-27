import { TestBed } from '@angular/core/testing';

import { CreatureSelectorsService } from './creature-selectors.service';

describe('CreatureSelectorsService', () => {
  let service: CreatureSelectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatureSelectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
