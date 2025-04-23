import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-restaurant-view',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './restaurant-view.component.html',
  styleUrl: './restaurant-view.component.css'
})
export class RestaurantViewComponent {
  showActions = false;
  firstClickDone = false;

  toggleActions(event: Event): void {
    event.stopPropagation();
    this.showActions = !this.showActions;

    // Hide "Click me" dialog permanently after first interaction
    if (!this.firstClickDone) {
      this.firstClickDone = true;
    }
  }

  closeActions(): void {
    this.showActions = false;
  }
}
