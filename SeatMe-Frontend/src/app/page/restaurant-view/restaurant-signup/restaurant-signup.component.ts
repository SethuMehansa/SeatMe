import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
  public signupData: Restaurant = new Restaurant( 0,'', '', '', '', '');

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  signup(): void {
    this.restaurantService.signUp(this.signupData).subscribe({
      next: () => {
        alert('Signup successful!');
        this.restaurantService.setCurrentRestaurant(this.signupData);
        this.router.navigate(['/restaurant-view/manage-restaurant']);

      },
      error: (err) => {
        console.error('Signup error:', err);
        if (err.status === 400 && err.error) {
          alert(err.error);
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  }
  
  
}
