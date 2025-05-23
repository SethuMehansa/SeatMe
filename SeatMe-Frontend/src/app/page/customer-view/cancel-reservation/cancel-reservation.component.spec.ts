import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationComponent } from './cancel-reservation.component';

describe('CancelReservationComponent', () => {
  let component: CancelReservationComponent;
  let fixture: ComponentFixture<CancelReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
