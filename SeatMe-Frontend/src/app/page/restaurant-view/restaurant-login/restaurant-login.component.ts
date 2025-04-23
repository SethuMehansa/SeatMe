import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Component } from '@angular/core';
import { RestaurantService } from '../../../service/RestaurantService';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../../model/Restaurant';

@Component({
  selector: 'app-restaurant-login',
  standalone: true, // Ensure the component is standalone
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule // Import HttpClientModule here
  ],
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent {
  loginData: Restaurant = new Restaurant( '', '', '', '', '');

  constructor(private restaurantService: RestaurantService,private router: Router ) {}

  login(): void {
    this.restaurantService.logIn(this.loginData).subscribe({
      next: (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.restaurantService.getRestaurantByEmail(this.loginData.managerEmail).subscribe({
            next: (restaurant: Restaurant) => {
              this.restaurantService.setCurrentRestaurant(restaurant);
              const fetched = this.restaurantService.getCurrentRestaurant();
              console.log("Fetched immediately after set:", fetched);
             
              
              this.router.navigate(['/restaurant-view/manage-restaurant']);
            }
          });
        } else {
          alert('Invalid email or password. Please try again.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed. Please try again later.');
      }
    });
  }
  
}
