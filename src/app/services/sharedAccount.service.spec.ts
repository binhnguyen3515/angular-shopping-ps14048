/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedAccountService } from './sharedAccount.service';

describe('Service: SharedAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedAccountService]
    });
  });

  it('should ...', inject([SharedAccountService], (service: SharedAccountService) => {
    expect(service).toBeTruthy();
  }));
});
