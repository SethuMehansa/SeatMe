package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.repository.RestaurantRepository;
import edu.icet.ecom.service.RestaurantService;
import edu.icet.ecom.dto.Restaurant;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    // Create a new restaurant and return the DTO
    @Override
    public Restaurant createRestaurant(Restaurant restaurantDTO) {
        RestaurantEntity restaurantEntity = modelMapper.map(restaurantDTO, RestaurantEntity.class);
        RestaurantEntity savedRestaurant = restaurantRepository.save(restaurantEntity);
        return modelMapper.map(savedRestaurant, Restaurant.class);
    }

    // Get all restaurants and return a list of DTOs
    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(restaurantEntity -> modelMapper.map(restaurantEntity, Restaurant.class))
                .collect(Collectors.toList());
    }
    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }
}
