package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl {

    private final RestaurantRepository restaurantRepository;

    public RestaurantEntity addRestaurant(RestaurantEntity restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public List<RestaurantEntity> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<RestaurantEntity> getRestaurantByName(String name) {
        return restaurantRepository.findByName(name);
    }

    public Optional<RestaurantEntity> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }
}

