/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedProductService } from './sharedProduct.service';

describe('Service: SharedProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedProductService]
    });
  });

  it('should ...', inject([SharedProductService], (service: SharedProductService) => {
    expect(service).toBeTruthy();
  }));
});
