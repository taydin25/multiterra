package customermanagement.entity;

import jakarta.persistence.*;
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
    private String name;
    private String surname;
    private String email;
    private String phone_number;
    @Column(name = "address_id", unique = true)
    private UUID addressId;
    @Column(name = "national_id", unique = true)
    private String nationalId;
    private String status; // ACTIVE, INACTIVE
    private String type;
    private LocalDateTime created_date;
    private LocalDateTime updated_date;

}
