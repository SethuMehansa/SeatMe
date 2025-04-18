import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginComponent } from './page/login/login.component';
import { CustomerViewComponent } from './page/customer-view/customer-view.component';
import { RestaurantViewComponent } from './page/restaurant-view/restaurant-view.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,CustomerViewComponent,RestaurantViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SeatMe-Frontend';
  ngOnInit(): void {
    initFlowbite();
  }
}
