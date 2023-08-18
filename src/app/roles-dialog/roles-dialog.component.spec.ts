import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesDialogComponent } from './roles-dialog.component';

describe('RolesDialogComponent', () => {
  let component: RolesDialogComponent;
  let fixture: ComponentFixture<RolesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesDialogComponent]
    });
    fixture = TestBed.createComponent(RolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
