import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../service/RestaurantService';
import { Restaurant } from '../../../model/Restaurant';
import { Table } from '../../../model/Table';
import { TableService } from '../../../service/TableService';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-restaurant',
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
  availabilityFilter: string = 'all'; // Added availability filter
  showAddModal: boolean = false;
  showUpdateModal = false;
  showDeleteModal = false;
  confirmDeleteStep = false;
  deletePassword = '';

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

  // Computed list of tables filtered by search and availability filter
  get filteredTables(): Table[] {
    let filtered = this.tables;

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(table =>
        table.tableNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Availability filter
    if (this.availabilityFilter === 'available') {
      filtered = filtered.filter(table => table.available);
    } else if (this.availabilityFilter === 'notAvailable') {
      filtered = filtered.filter(table => !table.available);
    }

    return filtered;
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
  updateRestaurant(): void {
    if (!this.currentRestaurant || !this.currentRestaurant.id) {
      alert("Restaurant ID missing!");
      return;
    }
  
    this.restaurantService.updateRestaurant(this.currentRestaurant.id, this.currentRestaurant).subscribe({
      next: (updated) => {
        this.currentRestaurant = updated;
        alert("Restaurant updated successfully!");
        this.showUpdateModal = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert("Failed to update restaurant. Try again.");
      }
    });
  }
  // Delete a table
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

  // Handle search term change
  onSearchChange(): void {
    // You can add any additional logic you want to handle search term changes here
    console.log('Search term changed:', this.searchTerm);
  }

  // Handle availability filter change
  onFilterChange(): void {
    console.log('Filter changed:', this.availabilityFilter);
  }
  deleteRestaurant() {
    if (!this.confirmDeleteStep) {
      // First step: ask for confirmation
      this.confirmDeleteStep = true;
    } else {
      // Simulate backend password verification
      if (this.deletePassword === this.currentRestaurant?.managerPassword) {
        // Call the service to delete the restaurant (replace this with your actual logic)
        this.restaurantService.deleteRestaurant(this.currentRestaurant!.id).subscribe(() => {
          alert('Restaurant deleted successfully');
          // Add any cleanup or redirection here
        });
        this.showDeleteModal = false;
        this.confirmDeleteStep = false;
        this.deletePassword = '';
      } else {
        alert('Incorrect password');
      }
    }
}
}