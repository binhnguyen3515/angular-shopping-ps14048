/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedCateService } from './sharedCate.service';

describe('Service: SharedCate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedCateService]
    });
  });

  it('should ...', inject([SharedCateService], (service: SharedCateService) => {
    expect(service).toBeTruthy();
  }));
});
