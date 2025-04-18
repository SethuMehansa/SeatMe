import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { CustomerViewComponent } from './page/customer-view/customer-view.component';
import { RestaurantViewComponent } from './page/restaurant-view/restaurant-view.component';




export const routes: Routes = [
   {
    path:"",
    component:LoginComponent
   },
   {
    path:"login",
    component:LoginComponent
   },
   {
    path:"customer-view",
    component:CustomerViewComponent
   },
   {
    path:"restaurant-view",
    component:RestaurantViewComponent
   }
];
