package customermanagement.entity;

import customermanagement.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customer_info",schema = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID customerId;
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "surname is required")
    private String surname;
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "phone_number is required")
    private String phone_number;
    @NotBlank(message = "nationalId is required")
    @Column(name = "national_id", unique = true)
    private String nationalId;
    @NotBlank(message = "Email is required")
    private String status; // ACTIVE, INACTIVE @NotBlank
    private String type;
    private LocalDateTime created_date;
    private LocalDateTime updated_date;
    //ADDRESS
    @NotBlank(message = "country is required")
    private String country;
    @NotBlank(message = "city is required")
    private String city;
    @NotBlank(message = "district is required")
    private String district;
    @NotBlank(message = "address is required")
    private String address;
    private String fullAddress;
    //AUTH
    @NotBlank(message = "username is required")
    private String username;
    @NotBlank(message = "password is required")
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

}
