package customermanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "customer_info",schema = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    @Setter
    private UUID customerId;

    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String surname;
    @Getter
    @Setter
    private String email;


    public Customer() {
    }

    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }


}
