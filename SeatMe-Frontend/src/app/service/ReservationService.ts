import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/create-reservation`, reservation);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/get-all`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/get-by-id/${id}`);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getReservationsByCustomerId(customerId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/get-by-customer/${customerId}`);
  }
}
