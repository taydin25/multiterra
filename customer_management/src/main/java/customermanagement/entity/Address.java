package customermanagement.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "customer_info",schema = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "address_id", unique = true)
    private UUID addressId;
    private String country;
    private String city;
    private String district;
    private String address;


}
