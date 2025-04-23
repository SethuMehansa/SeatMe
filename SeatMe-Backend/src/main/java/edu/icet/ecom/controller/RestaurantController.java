package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Restaurant;
import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@CrossOrigin
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping("/create-restaurant")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(restaurant));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        // Log the response
        System.out.println("Restaurants: " + restaurants);
        return ResponseEntity.ok(restaurants);
    }


    // Optional delete if you want it:
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody Restaurant restaurant) {
        try {
            restaurantService.signUp(restaurant);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> logIn(@RequestBody Restaurant restaurant) {
        try {
            boolean isAuthenticated = restaurantService.logIn(restaurant.getManagerEmail(), restaurant.getManagerPassword());
            return new ResponseEntity<>(isAuthenticated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/email/{email}")
    public Restaurant getRestaurantByEmail(@PathVariable String email) {
        return restaurantService.getRestaurantDtoByEmail(email);
    }

}