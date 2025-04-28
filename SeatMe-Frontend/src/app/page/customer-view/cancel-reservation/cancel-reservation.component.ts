import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReservationService } from '../../../service/ReservationService';
import { Reservation } from '../../../model/Reservation'; 

@Component({
  selector: 'app-cancel-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.css']
})
export class CancelReservationComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadCustomerReservations();
  }

  loadCustomerReservations(): void {
    const customerId = this.getCurrentCustomerId();  

    this.reservationService.getReservationsByCustomerId(customerId).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        console.log(this.reservations);
        
      },
      error: (err) => {
        console.error('Failed to load reservations:', err);
      }
    });
  }

  cancelReservation(reservationId: number): void {
    // Show confirmation dialog before canceling
    const isConfirmed = window.confirm('Are you sure you want to cancel this reservation?');
  
    if (isConfirmed) {
      this.reservationService.deleteReservation(reservationId).subscribe({
        next: () => {
          console.log('Reservation cancelled successfully.');
          this.loadCustomerReservations(); // Reload the list after cancel
        },
        error: (err) => {
          console.error('Failed to cancel reservation:', err);
        }
      });
    } else {
      console.log('Reservation cancellation was cancelled.');
    }
  }
  
  

  getCurrentCustomerId(): number {
    const customerToken = JSON.parse(localStorage.getItem('customerToken') || '{}');  // Get the saved customer object
    return customerToken?.id || 0;  // Access the customer ID from the object, fallback to 0 if not found
  }
  
  
}
