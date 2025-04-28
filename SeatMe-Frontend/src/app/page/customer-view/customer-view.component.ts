import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Restaurant } from '../../model/Restaurant';
import { RestaurantService } from '../../service/RestaurantService';
import { TableService } from '../../service/TableService';
import { Table } from '../../model/Table';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent {
 
}
