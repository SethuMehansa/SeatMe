import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../service/RestaurantService';
import { Restaurant } from '../../../model/Restaurant';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-restaurant',
  imports: [CommonModule, 
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule],
  templateUrl: './manage-restaurant.component.html',
  styleUrl: './manage-restaurant.component.css'
})
export class ManageRestaurantComponent implements OnInit{
  currentRestaurant: Restaurant | null = null;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    
      this.currentRestaurant = this.restaurantService.getCurrentRestaurant();
      console.log('Current restaurant in component after timeout:', this.currentRestaurant);
      
      if (!this.currentRestaurant) {
        console.log('No restaurant data available.');
      }
    
  }
  
}
