package order_management.entity;

import lombok.*;
import order_management.enums.OrderStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "order_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private UUID id;

    private String orderNumber;

    private UUID customerId;

    private List<OrderItem> items;

    private BigDecimal totalPrice;

    private String currency;

    private OrderStatus status;

    private LocalDateTime orderDate;

    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    private String shippingAddress;

    private String note;
}