package edu.icet.ecom.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

@Entity
@Data
@Table(name = "restaurant")
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @Column(unique = true)
    private String contactNumber;

    @NotNull
    @Column(unique = true)
    private String managerEmail;

    @NotNull
    private String managerPassword;

    private String imageUrl;
}
