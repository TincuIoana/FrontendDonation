import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsDialogComponent } from './donors-dialog.component';

describe('DonorsDialogComponent', () => {
  let component: DonorsDialogComponent;
  let fixture: ComponentFixture<DonorsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorsDialogComponent]
    });
    fixture = TestBed.createComponent(DonorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
