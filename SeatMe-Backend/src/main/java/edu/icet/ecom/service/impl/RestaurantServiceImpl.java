package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.RestaurantEntity;
import edu.icet.ecom.repository.RestaurantRepository;
import edu.icet.ecom.service.RestaurantService;
import edu.icet.ecom.dto.Restaurant;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jasypt.util.text.BasicTextEncryptor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;
    private final BasicTextEncryptor textEncryptor;  // Injected encryptor

    // Create a new restaurant and return the DTO
    @Override
    public Restaurant createRestaurant(Restaurant restaurantDTO) {
        // Encrypt the password before saving
        restaurantDTO.setManagerPassword(textEncryptor.encrypt(restaurantDTO.getManagerPassword()));

        RestaurantEntity restaurantEntity = modelMapper.map(restaurantDTO, RestaurantEntity.class);
        RestaurantEntity savedRestaurant = restaurantRepository.save(restaurantEntity);

        return modelMapper.map(savedRestaurant, Restaurant.class);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        List<RestaurantEntity> restaurantEntities = restaurantRepository.findAll();
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
        if (restaurantRepository.existsByManagerEmail(restaurant.getManagerEmail())) {
            throw new RuntimeException("Email is already registered.");
        }

        if (restaurantRepository.existsByContactNumber(restaurant.getContactNumber())) {
            throw new RuntimeException("Contact number is already registered.");
        }

        // Encrypt the password before saving
        restaurant.setManagerPassword(textEncryptor.encrypt(restaurant.getManagerPassword()));
        restaurantRepository.save(modelMapper.map(restaurant, RestaurantEntity.class));
    }

    @Override
    public boolean logIn(String email, String password) {
        List<RestaurantEntity> byEmail = restaurantRepository.findByManagerEmail(email);
        for (RestaurantEntity restaurant : byEmail) {
            // Decrypt stored password and compare
            String decryptedPassword = textEncryptor.decrypt(restaurant.getManagerPassword());
            System.out.println("Decrypted password: " + decryptedPassword);
            if (decryptedPassword.equals(password)) {
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

        // Update the password only if provided
        if (updatedRestaurant.getManagerPassword() != null && !updatedRestaurant.getManagerPassword().isEmpty()) {
            existing.setManagerPassword(textEncryptor.encrypt(updatedRestaurant.getManagerPassword()));
        }

        return restaurantRepository.save(existing);
    }
}
