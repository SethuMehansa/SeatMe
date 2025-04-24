import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../service/RestaurantService';
import { Restaurant } from '../../../model/Restaurant';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Table } from '../../../model/Table';
import { TableService } from '../../../service/TableService';

@Component({
  selector: 'app-manage-restaurant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit {
  currentRestaurant: Restaurant | null = null;
  tables: Table[] = [];
  searchTerm: string = '';
  showAddModal: boolean = false;

  // Table creation form model (no ID to avoid backend error)
  newTable: Partial<Table> = {
    tableNumber: '',
    capacity: 0,
    available: true
  };

  constructor(
    private restaurantService: RestaurantService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.currentRestaurant = this.restaurantService.getCurrentRestaurant();
    console.log('Current restaurant in component:', this.currentRestaurant);

    if (this.currentRestaurant) {
      this.loadTables(this.currentRestaurant.id);
    } else {
      console.log('No restaurant data available.');
    }
  }

  // Fetch tables for current restaurant
  loadTables(restaurantId: number): void {
    this.tableService.getTablesByRestaurantId(restaurantId).subscribe(
      (data) => {
        this.tables = data;
        console.log('Tables fetched:', this.tables);
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  // Computed list of tables filtered by search
  get filteredTables(): Table[] {
    if (!this.searchTerm) return this.tables;
    return this.tables.filter(table =>
      table.tableNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Add new table
  addTable(): void {
    if (!this.currentRestaurant) return;

    const tableToAdd: Table = {
      ...this.newTable,
      restaurantId: this.currentRestaurant.id
    } as Table;

    this.tableService.createTable(tableToAdd).subscribe(
      (addedTable) => {
        this.tables.push(addedTable);
        this.resetNewTableForm();
        this.showAddModal = false;
        console.log('Table added:', addedTable);
      },
      (error) => {
        console.error('Error adding table:', error);
      }
    );
  }

  deleteTable(id: number | undefined): void {
    if (id === undefined) {
      console.error('Table ID is undefined.');
      return;
    }
  
    if (!confirm('Are you sure you want to delete this table?')) return;
  
    this.tableService.deleteTable(id).subscribe(
      () => {
        this.tables = this.tables.filter(table => table.id !== id);
        console.log(`Table with ID ${id} deleted`);
      },
      (error) => {
        console.error('Error deleting table:', error);
      }
    );
  }
  

  // Reset add form
  resetNewTableForm(): void {
    this.newTable = {
      tableNumber: '',
      capacity: 0,
      available: true
    };
  }
}
