import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RestaurantService } from '../../../service/RestaurantService';
import { Restaurant } from '../../../model/Restaurant';

@Component({
  selector: 'app-restaurant-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './restaurant-signup.component.html',
  styleUrls: ['./restaurant-signup.component.css']
})
export class RestaurantSignupComponent {
  // Use Partial<Restaurant> to omit the id during signup
  public signupData: Partial<Restaurant> = {
    name: '',
    address: '',
    contactNumber: '',
    managerEmail: '',
    managerPassword: ''
  };

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  signup(): void {
    // Perform signup with the Partial<Restaurant> object
    this.restaurantService.signUp(this.signupData as Restaurant).subscribe({
      next: () => {
        alert('Signup successful!');
        this.restaurantService.setCurrentRestaurant(this.signupData as Restaurant);
        this.router.navigate(['/restaurant-view/manage-restaurant']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        if (err.status === 400 && err.error) {
          alert(err.error); // Show error message if provided
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  }
}
