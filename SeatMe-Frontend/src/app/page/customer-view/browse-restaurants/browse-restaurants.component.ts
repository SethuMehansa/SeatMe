import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Restaurant } from '../../../model/Restaurant';
import { Table } from '../../../model/Table';
import { RestaurantService } from '../../../service/RestaurantService';
import { TableService } from '../../../service/TableService';

@Component({
  selector: 'app-browse-restaurants',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './browse-restaurants.component.html',
  styleUrls: ['./browse-restaurants.component.css']
})
export class BrowseRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';

  showModal: boolean = false;
  selectedRestaurant: Restaurant | null = null;
  restaurantTables: Table[] = [];

  showActions: boolean = false;       
  firstClickDone: boolean = false;     

  constructor(
    private restaurantService: RestaurantService,
    private tableService: TableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllRestaurants();
  }

  loadAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data: Restaurant[]) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
        console.log('Restaurants loaded:', data);
      },
      error: (err) => {
        console.error('Failed to load restaurants:', err);
      }
    });
  }

  searchRestaurants(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(term)
    );
  }

  viewRestaurantDetails(id: number): void {
    const restaurant = this.restaurants.find((r) => r.id === id);
    if (restaurant) {
      this.selectedRestaurant = restaurant;
      this.showModal = true;

      this.tableService.getTablesByRestaurantId(id).subscribe({
        next: (tables: Table[]) => {
          this.restaurantTables = tables;
        },
        error: (err) => {
          console.error('Error loading tables:', err);
          this.restaurantTables = [];
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRestaurant = null;
    this.restaurantTables = [];
  }

  reserveSelectedTable(table: Table): void {
    if (this.selectedRestaurant) {
      this.router.navigate(['/customer-view/reserve-table'], {
        state: { table: table, restaurant: this.selectedRestaurant }
      });
    } else {
      console.error('No restaurant selected');
    }
  }

  

  toggleActions(event: MouseEvent): void {
    event.stopPropagation();   // prevent click from bubbling up
    this.showActions = !this.showActions;
    this.firstClickDone = true;
  }

  closeActions(): void {
    this.showActions = false;
  }
  
}
