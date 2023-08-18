import { TestBed } from '@angular/core/testing';

import { RolesDialogPermissionsService } from './roles-dialog-permissions.service';

describe('RolesDialogPermissionsService', () => {
  let service: RolesDialogPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesDialogPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
