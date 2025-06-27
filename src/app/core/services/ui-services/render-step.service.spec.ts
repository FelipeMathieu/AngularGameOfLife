import { TestBed } from '@angular/core/testing';

import { RenderStepService } from './render-step.service';

describe('RenderStepService', () => {
  let service: RenderStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
