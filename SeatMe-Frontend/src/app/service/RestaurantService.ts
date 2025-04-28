import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/Restaurant';

@Injectable({
  providedIn: 'root' 
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8080/api/restaurants';
  private currentRestaurant: Restaurant | null = null;
  constructor(private http: HttpClient) { } 


  setCurrentRestaurant(restaurant: Restaurant): void {
    this.currentRestaurant = restaurant;
    console.log('Restaurant set:', this.currentRestaurant);  
  }
  
  getCurrentRestaurant(): Restaurant | null {
    console.log('Restaurant retrieved:', this.currentRestaurant);  
    return this.currentRestaurant;
  }
  
  updateRestaurant(id: number, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/update/${id}`, data);
  }
  
  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/create-restaurant`, restaurant);
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/get-all`);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  signUp(restaurant: Restaurant): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, restaurant);
  }

  logIn(restaurant: Restaurant): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, restaurant);
  }
  getRestaurantByEmail(email: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/email/${email}`);
  }
  
}
