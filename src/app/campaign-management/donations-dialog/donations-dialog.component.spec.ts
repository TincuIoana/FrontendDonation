import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsDialogComponent } from './donations-dialog.component';

describe('DonationsDialogComponent', () => {
  let component: DonationsDialogComponent;
  let fixture: ComponentFixture<DonationsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationsDialogComponent]
    });
    fixture = TestBed.createComponent(DonationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
