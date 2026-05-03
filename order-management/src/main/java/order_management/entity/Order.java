package order_management.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "order_info")
public class Order {

    @Id
    private String id;

    @Field("orderId")
    private String orderId;

    @Field("customerId")
    private String customerId;

    private List<OrderItem> items;

    private Double totalPrice;

    private String status;

    private LocalDateTime orderDate;
}