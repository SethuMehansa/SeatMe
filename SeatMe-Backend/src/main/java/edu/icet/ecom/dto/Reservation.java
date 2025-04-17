package edu.icet.ecom.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    private Long id;
    private Long customerId;
    private Long tableId;
    private LocalDateTime reservationTime;
    private Integer numberOfGuests;
}

