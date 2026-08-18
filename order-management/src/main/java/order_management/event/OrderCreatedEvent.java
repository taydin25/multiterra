package order_management.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreatedEvent {

    private String eventType;
    private UUID orderId;
    private String orderNumber;
    private UUID customerId;
    private BigDecimal totalPrice;
    private String currency;
    private List<OrderItemEvent> items;
}