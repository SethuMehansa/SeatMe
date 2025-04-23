package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.repository.RestaurantRepository;
import edu.icet.ecom.service.RestaurantService;
import edu.icet.ecom.dto.Restaurant;
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
            return convertToDto(restaurantEntities.get(0));
        } else {
            throw new RuntimeException("Restaurant with given email not found.");
        }
    }

    // Manual conversion method
    private Restaurant convertToDto(RestaurantEntity entity) {
        Restaurant dto = new Restaurant();
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setContactNumber(entity.getContactNumber());
        dto.setManagerEmail(entity.getManagerEmail());
        dto.setManagerPassword(entity.getManagerPassword());
        return dto;
    }

}
