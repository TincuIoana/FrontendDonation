import { TestBed } from '@angular/core/testing';

import { RolesDialogService } from './roles-dialog.service';

describe('RolesDialogService', () => {
  let service: RolesDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
