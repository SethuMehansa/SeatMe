import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { CustomerViewComponent } from './page/customer-view/customer-view.component';
import { CustomerLoginComponent } from './page/customer-view/customer-login/customer-login.component';
import { RestaurantViewComponent } from './page/restaurant-view/restaurant-view.component';
import { RestaurantLoginComponent } from './page/restaurant-view/restaurant-login/restaurant-login.component';
import { RestaurantSignupComponent } from './page/restaurant-view/restaurant-signup/restaurant-signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageRestaurantComponent } from './page/restaurant-view/manage-restaurant/manage-restaurant.component';
import { CustomerSignupComponent } from './page/customer-view/customer-signup/customer-signup.component';
import { ReserveTableComponent } from './page/customer-view/reserve-table/reserve-table.component';
import { BrowseRestaurantsComponent } from './page/customer-view/browse-restaurants/browse-restaurants.component';
import { CancelReservationComponent } from './page/customer-view/cancel-reservation/cancel-reservation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LandingPageComponent,CustomerViewComponent,CustomerLoginComponent,RestaurantViewComponent,RestaurantLoginComponent,RestaurantSignupComponent,CancelReservationComponent,CustomerSignupComponent,ManageRestaurantComponent,ReserveTableComponent,BrowseRestaurantsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SeatMe-Frontend';
  ngOnInit(): void {
    initFlowbite();
  }
}
