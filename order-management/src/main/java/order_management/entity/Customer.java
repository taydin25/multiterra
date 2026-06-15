package order_management.entity;


import lombok.*;
import java.util.UUID;

@Data
public class Customer {

    private UUID customerId;
    private String name;
    private String surname;
    private String email;
}