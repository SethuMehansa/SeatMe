import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/save-customer`, customer);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/get-all`);
  }

  getByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/get-by-email/${email}`);
  }

  getByContactNumber(contactNumber: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/get-by-contact/${contactNumber}`);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
