import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../model/Table';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://localhost:8080/api/tables';

  constructor(private http: HttpClient) {}

  createTable(table: Table): Observable<Table> {
    return this.http.post<Table>(`${this.apiUrl}/create-table`, table);
  }
  deleteTable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/get-all`);
  }

  getTablesByRestaurantId(restaurantId: number): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
  }
  

  isTableAvailable(tableId: number, requestedTime: string): Observable<boolean> {
    const params = new HttpParams().set('time', requestedTime);
    return this.http.get<boolean>(`${this.apiUrl}/available/${tableId}`, { params });
  }

  getAllAvailableTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/available`);
  }
}
