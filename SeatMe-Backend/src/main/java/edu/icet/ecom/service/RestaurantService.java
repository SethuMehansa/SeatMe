package edu.icet.ecom.service;

import edu.icet.ecom.dto.Restaurant;
import edu.icet.ecom.entity.RestaurantEntity;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {
    Restaurant createRestaurant(Restaurant restaurantDTO);
    List<Restaurant> getAllRestaurants();
    void deleteRestaurant(Long id);
    void signUp(Restaurant restaurant);
    boolean logIn(String email, String password);
    Restaurant getRestaurantDtoByEmail(String email);

}