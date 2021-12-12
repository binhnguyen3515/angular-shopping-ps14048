import { TestBed } from '@angular/core/testing';

import { AdminAccountGuard } from './admin-account.guard';

describe('AdminAccountGuard', () => {
  let guard: AdminAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
