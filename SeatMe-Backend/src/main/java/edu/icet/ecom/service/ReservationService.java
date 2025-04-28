package edu.icet.ecom.service;

import edu.icet.ecom.dto.Reservation;
import edu.icet.ecom.entity.ReservationEntity;

import java.util.List;
import java.util.Optional;

public interface ReservationService {
    Reservation createReservation(Reservation reservationDTO);
    List<Reservation> getAllReservations();
    Optional<Reservation> getReservationById(Long id);
    void deleteReservation(Long id);
    public List<Reservation> getReservationsByCustomerId(Long customerId);
   }
