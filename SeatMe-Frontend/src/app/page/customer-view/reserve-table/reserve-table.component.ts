import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Customer } from '../../../model/Customer';
import { Reservation } from '../../../model/Reservation';
import { Restaurant } from '../../../model/Restaurant';
import { Table } from '../../../model/Table';
import { ReservationService } from '../../../service/ReservationService';

@Component({
  selector: 'app-reserve-table',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './reserve-table.component.html',
  styleUrls: ['./reserve-table.component.css']
})
export class ReserveTableComponent implements OnInit {
  customer: Customer | null = null;
  restaurant: Restaurant | null = null;
  table: Table | null = null;

  reservationTime: string = ''; 
  numberOfGuests: number = 1;  

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch customer from localStorage
    const customerToken = localStorage.getItem('customerToken');
    if (customerToken) {
      this.customer = JSON.parse(customerToken);
    }

    // Fetch table and restaurant from router state
    const state = history.state;
    if (state?.table && state?.restaurant) {
      this.table = state.table;
      this.restaurant = state.restaurant;
      console.log('Table and Restaurant loaded:', this.table, this.restaurant);
    } else {
      alert('No table or restaurant information found. Please select again.');
      console.error('State not found');
    }
  }

  reserveTable(): void {
    if (!this.customer || !this.table || !this.reservationTime || this.numberOfGuests <= 0) {
      alert('Missing information. Please fill all the fields.');
      return;
    }

    const reservation: Reservation = {
      
      customerId: this.customer.id!,
      tableId: this.table.id!,
      reservationTime: this.reservationTime,
      numberOfGuests: this.numberOfGuests
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        console.log('Reservation successful', res);
        alert('Reservation successful!');
        this.router.navigate(['/customer-view/browse-restaurants']);
      },
      error: (err) => {
        console.error('Reservation failed', err);
        alert('Reservation failed. Try again.');
      }
    });
  }
}
