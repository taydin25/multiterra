package order_management.service;

//import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import order_management.entity.Customer;
import order_management.entity.Order;
import order_management.entity.OrderItem;
import order_management.enums.OrderStatus;
import order_management.event.OrderCreatedEvent;
import order_management.event.OrderItemEvent;
import order_management.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RabbitMQProducer rabbitMQProducer;

    public OrderService(OrderRepository orderRepository, CustomerServiceClient customerServiceClient, EmailService emailService,RabbitMQProducer rabbitMQProducer) {
        this.orderRepository = orderRepository;
        this.rabbitMQProducer= rabbitMQProducer;
    }

    public List<Order> getOrdersByCustomerId(UUID customerId) {

        return orderRepository.findByCustomerId(customerId);
    }

    public Order createOrder(Order order) {

        long count = orderRepository.count();

        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setOrderNumber("ORDER-" + (count + 1));
        order.setCreatedDate(LocalDateTime.now());
        order.setUpdatedDate(LocalDateTime.now());
        order.setOrderDate(LocalDateTime.now());

        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        Order savedOrder = orderRepository.save(order);
        // ORDER ITEM -> EVENT ITEM
        List<OrderItemEvent> itemEvents = savedOrder.getItems()
                .stream()
                .map(item -> OrderItemEvent.builder()
                        .productCode(item.getProductCode())
                        .productName(item.getProductName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .build())
                .toList();

        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .eventType("ORDER_CREATED")
                .orderId(savedOrder.getId())
                .orderNumber(savedOrder.getOrderNumber())
                .customerId(savedOrder.getCustomerId())
                .totalPrice(savedOrder.getTotalPrice())
                .currency(savedOrder.getCurrency())
                .items(itemEvents)
                .build();

        rabbitMQProducer.sendOrderCreatedEvent(event);
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order cancellOrder(String orderNumber) {
        Order foundOrder=orderRepository.findByOrderNumber(orderNumber);
        foundOrder.setStatus(OrderStatus.CANCELLED);
        return orderRepository.save(foundOrder);
    }

    /*public List<Order> test(){    return mongoTemplate.findAll(Order.class); }
    @PostConstruct
    public void checkDb() {System.out.println("COUNT = " + mongoTemplate.getCollection("order_info").countDocuments());}
    @PostConstruct
    public void checkDb2() {System.out.println("DB NAME = " + mongoTemplate.getDb().getName());}*/
}