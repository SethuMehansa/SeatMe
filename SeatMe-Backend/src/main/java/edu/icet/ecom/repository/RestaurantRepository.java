package edu.icet.ecom.repository;

import edu.icet.ecom.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<RestaurantEntity,Long> {
    Optional<RestaurantEntity> findByName(String name);
}
