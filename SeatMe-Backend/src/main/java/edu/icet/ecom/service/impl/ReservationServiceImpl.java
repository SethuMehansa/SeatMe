package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.ReservationEntity;
import edu.icet.ecom.repository.ReservationRepository;
import edu.icet.ecom.service.ReservationService;
import edu.icet.ecom.dto.Reservation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;

    // Create a new reservation and return the DTO
    @Override
    public Reservation createReservation(Reservation reservationDTO) {
        ReservationEntity reservationEntity = modelMapper.map(reservationDTO, ReservationEntity.class);
        ReservationEntity savedReservation = reservationRepository.save(reservationEntity);
        return modelMapper.map(savedReservation, Reservation.class);
    }

    // Get all reservations and return a list of DTOs
    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(reservationEntity -> modelMapper.map(reservationEntity, Reservation.class))
                .collect(Collectors.toList());
    }

    // Get a reservation by ID and return DTO
    @Override
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(reservationEntity -> modelMapper.map(reservationEntity, Reservation.class));
    }

    // Delete reservation by ID
    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
