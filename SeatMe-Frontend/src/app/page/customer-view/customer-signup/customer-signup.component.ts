import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Customer } from '../../../model/Customer';
import { CustomerService } from '../../../service/CustomerService';

@Component({
  selector: 'app-customer-signup',
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule],
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.css'
})
export class CustomerSignupComponent {
  signupRequest: Customer = {
    name: '',
    email: '',
    contactNumber: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  signup() {
    if (!this.signupRequest.name || !this.signupRequest.email || !this.signupRequest.contactNumber) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.customerService.saveCustomer(this.signupRequest)
      .subscribe({
        next: (response) => {
          console.log('Signup successful!', response);
          this.successMessage = 'Signup successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/customer-view/browse-restaurants']);
          }, 1000);
        },
        error: (error) => {
          console.error('Signup failed', error);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      });
  }
}
