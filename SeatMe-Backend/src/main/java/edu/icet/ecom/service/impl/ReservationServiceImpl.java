package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.ReservationEntity;
import edu.icet.ecom.entity.TableEntity;
import edu.icet.ecom.repository.ReservationRepository;
import edu.icet.ecom.repository.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    public ReservationEntity makeReservation(ReservationEntity reservation) {
        // Optional logic to mark table as unavailable
        TableEntity table = reservation.getTable();
        table.setAvailable(false);
        tableRepository.save(table);

        return reservationRepository.save(reservation);
    }

    public List<ReservationEntity> getReservationsByCustomerId(Long customerId) {
        return reservationRepository.findByCustomerId(customerId);
    }

    public List<ReservationEntity> getReservationsByRestaurantId(Long restaurantId) {
        return reservationRepository.findByTableRestaurantId(restaurantId);
    }
}

