import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../../service/CustomerService';
import { Customer } from '../../../model/Customer';

@Component({
  selector: 'app-customer-login',
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  email: string = '';
  contactNumber: string = '';
  errorMessage: string = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  login() {
    const loginData: Customer = {
      email: this.email,
      contactNumber: this.contactNumber,
      name: '', 
    };

    this.customerService.loginCustomer(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('customerToken', JSON.stringify(response)); // save customer object
        this.router.navigate(['/customer-view/browse-restaurants']); 
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or contact number';
      },
    });
  }
}
