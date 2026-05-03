package order_management.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
public class OrderItem {

    @Id
    private UUID orderItemId;

    private UUID productId;

    private String productName;

    private Integer quantity;

    private Double price;
}
