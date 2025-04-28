import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  public signupData: Partial<Restaurant> = {
    name: '',
    address: '',
    contactNumber: '',
    managerEmail: '',
    managerPassword: '',
    imageUrl: ''
  };

  public imagePreview: string | ArrayBuffer | null = null;
  public isUploadingImage: boolean = false; // NEW: track upload status

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private http: HttpClient
  ) {}

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);

      this.uploadImageToCloudinary(file);
    }
  }

  uploadImageToCloudinary(file: File): void {
    this.isUploadingImage = true; // Start upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'seatme_unsigned');
  
    this.http.post<any>('https://api.cloudinary.com/v1_1/dgu6ccpoj/image/upload', formData)
      .subscribe({
        next: (response) => {
          this.signupData.imageUrl = response.secure_url;
          console.log('Image uploaded successfully:', response.secure_url);
          this.isUploadingImage = false; // Upload done
        },
        error: (error) => {
          console.error('Image upload failed:', error);
          alert('Image upload failed. Please try again.');
          this.isUploadingImage = false; // Upload done
        }
      });
  }

  signup(): void {
    if (this.isUploadingImage) {
      alert('Image is still uploading. Please wait.');
      return;
    }
    if (!this.signupData.imageUrl) {
      alert('Please upload an image.');
      return;
    }

    this.restaurantService.signUp(this.signupData as Restaurant).subscribe({
      next: () => {
        alert('Signup successful!');
        this.restaurantService.setCurrentRestaurant(this.signupData as Restaurant);
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
