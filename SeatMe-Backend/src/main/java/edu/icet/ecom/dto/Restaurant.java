package edu.icet.ecom.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
    private Long id;
    private String name;
    private String address;
    private String contactNumber;

    private String managerEmail;
    private String managerPassword;
    private String imageUrl;
}
