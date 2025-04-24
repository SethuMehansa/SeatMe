package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.repository.RestaurantRepository;
import edu.icet.ecom.service.RestaurantService;
import edu.icet.ecom.dto.Restaurant;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    // Create a new restaurant and return the DTO
    @Override
    public Restaurant createRestaurant(Restaurant restaurantDTO) {
        // No password encryption, just save the password as is
        RestaurantEntity restaurantEntity = modelMapper.map(restaurantDTO, RestaurantEntity.class);
        RestaurantEntity savedRestaurant = restaurantRepository.save(restaurantEntity);

        // Log saved restaurant to check the values
        System.out.println("Saved Restaurant: " + savedRestaurant);

        return modelMapper.map(savedRestaurant, Restaurant.class);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        List<RestaurantEntity> restaurantEntities = restaurantRepository.findAll();

        // Log the entity list before mapping
        restaurantEntities.forEach(restaurantEntity ->
                System.out.println("Restaurant Entity: " + restaurantEntity));

        return restaurantEntities.stream()
                .map(restaurantEntity -> modelMapper.map(restaurantEntity, Restaurant.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }

    @Override
    public void signUp(Restaurant restaurant) {
        // Check if email is already taken
        if (restaurantRepository.existsByManagerEmail(restaurant.getManagerEmail())) {
            throw new RuntimeException("Email is already registered.");
        }

        // Check if contact number is already taken
        if (restaurantRepository.existsByContactNumber(restaurant.getContactNumber())) {
            throw new RuntimeException("Contact number is already registered.");
        }

        // If both are unique, save the restaurant
        restaurantRepository.save(modelMapper.map(restaurant, RestaurantEntity.class));
    }


    @Override
    public boolean logIn(String email, String password) {
        List<RestaurantEntity> byEmail=restaurantRepository.findByManagerEmail(email);
        for (RestaurantEntity restaurant:byEmail){
            if (restaurant.getManagerPassword().equals(password)){
                return true;
            }
        }
        return false;
    }

    @Override
    public Restaurant getRestaurantDtoByEmail(String email) {
        List<RestaurantEntity> restaurantEntities = restaurantRepository.findByManagerEmail(email);
        if (!restaurantEntities.isEmpty()) {
            return modelMapper.map(restaurantEntities.get(0), Restaurant.class);
        } else {
            throw new RuntimeException("Restaurant with given email not found.");
        }
    }
    @Override
    public RestaurantEntity updateRestaurant(Long id, RestaurantEntity updatedRestaurant) {
        RestaurantEntity existing = restaurantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        existing.setName(updatedRestaurant.getName());
        existing.setAddress(updatedRestaurant.getAddress());
        existing.setContactNumber(updatedRestaurant.getContactNumber());
        existing.setManagerEmail(updatedRestaurant.getManagerEmail());

        // Optional: Only update password if provided (e.g., for profile updates)
        if (updatedRestaurant.getManagerPassword() != null && !updatedRestaurant.getManagerPassword().isEmpty()) {
            existing.setManagerPassword(updatedRestaurant.getManagerPassword());
        }

        return restaurantRepository.save(existing);
    }



}
