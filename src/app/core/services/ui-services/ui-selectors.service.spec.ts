import { TestBed } from '@angular/core/testing';

import { UISelectorsService } from './ui-selectors.service';

describe('UiSelectorsService', () => {
  let service: UISelectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UISelectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
