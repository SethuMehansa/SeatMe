package edu.icet.ecom.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Table {
    private Long id;
    private String tableNumber;
    private int capacity;
    private boolean available;
    private Long restaurantId; // optional, if linked to restaurant
}

