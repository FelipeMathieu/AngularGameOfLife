import { TestBed } from '@angular/core/testing';

import { CreatureNeighborsService } from './creature-neighbors.service';

describe('CreatureNeighborsService', () => {
  let service: CreatureNeighborsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatureNeighborsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
