package edu.icet.ecom.repository;

import edu.icet.ecom.entity.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TableRepository extends JpaRepository<TableEntity,Long> {
    List<TableEntity> findByRestaurantId(Long restaurantId);
    List<TableEntity> findByRestaurantIdAndAvailableTrue(Long restaurantId);

    List<TableEntity> findByAvailableTrue();
}
