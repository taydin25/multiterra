package order_management.service;

import jakarta.annotation.PostConstruct;
import order_management.entity.Order;
import order_management.enums.OrderStatus;
import order_management.repository.OrderItemRepository;
import order_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {

        long count = orderRepository.count();

        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setOrderNumber("ORDER-" + (count + 1));
        order.setCreatedDate(LocalDateTime.now());
        order.setUpdatedDate(LocalDateTime.now());
        order.setOrderDate(LocalDateTime.now());
        order.setId(UUID.randomUUID());

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /*public List<Order> test(){    return mongoTemplate.findAll(Order.class); }
    @PostConstruct
    public void checkDb() {System.out.println("COUNT = " + mongoTemplate.getCollection("order_info").countDocuments());}
    @PostConstruct
    public void checkDb2() {System.out.println("DB NAME = " + mongoTemplate.getDb().getName());}*/
}