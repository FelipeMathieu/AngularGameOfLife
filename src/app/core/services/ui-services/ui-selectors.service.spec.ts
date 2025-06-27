import { TestBed } from '@angular/core/testing';

import { UiSelectorsService } from './ui-selectors.service';

describe('UiSelectorsService', () => {
  let service: UiSelectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSelectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
