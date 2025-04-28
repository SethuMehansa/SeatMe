import { Routes } from '@angular/router';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { CustomerViewComponent } from './page/customer-view/customer-view.component';
import { CustomerLoginComponent } from './page/customer-view/customer-login/customer-login.component';
import { RestaurantViewComponent } from './page/restaurant-view/restaurant-view.component';
import { RestaurantLoginComponent } from './page/restaurant-view/restaurant-login/restaurant-login.component';
import { RestaurantSignupComponent } from './page/restaurant-view/restaurant-signup/restaurant-signup.component';
import { CustomerSignupComponent } from './page/customer-view/customer-signup/customer-signup.component';
import { ManageRestaurantComponent } from './page/restaurant-view/manage-restaurant/manage-restaurant.component';
import { ReserveTableComponent } from './page/customer-view/reserve-table/reserve-table.component';
import { BrowseRestaurantsComponent } from './page/customer-view/browse-restaurants/browse-restaurants.component';
import { CancelReservationComponent } from './page/customer-view/cancel-reservation/cancel-reservation.component';


export const routes: Routes = [
    {
        path: "",
        component: LandingPageComponent
    },
    {
        path: "customer-view",
        component: CustomerViewComponent,
        children: [
            {
                path: "browse-restaurants",
                component: BrowseRestaurantsComponent
            },
            {
                path: "",
                component: CustomerLoginComponent
            },
            {
                path: "customer-signup",
                component: CustomerSignupComponent
            },
            {
                path: "reserve-table",
                component: ReserveTableComponent
            },
            {
                path: "cancel-reservation",
                component: CancelReservationComponent
            }
        ]
    },

    {
        path: "restaurant-view",
        component: RestaurantViewComponent,
        children: [
        {
            path: "restaurant-login",
            component: RestaurantLoginComponent
        },
        {
            path: 'restaurant-signup',
            component: RestaurantSignupComponent
        },
        {
            path: "manage-restaurant",
            component: ManageRestaurantComponent
        }
                ]
    }


];
