package edu.icet.ecom.repository;

import edu.icet.ecom.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository  extends JpaRepository<ReservationEntity, Long> {
    List<ReservationEntity> findByCustomerId(Long customerId);
    List<ReservationEntity> findByTableId(Long tableId);
    List<ReservationEntity> findByTableRestaurantId(Long restaurantId);
}
