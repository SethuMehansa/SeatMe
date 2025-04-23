package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Reservation;
import edu.icet.ecom.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/create-reservation")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.createReservation(reservation));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}

