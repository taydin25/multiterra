package order_management.service;

import jakarta.annotation.PostConstruct;
import order_management.entity.Customer;
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

    private final CustomerServiceClient customerServiceClient;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository, CustomerServiceClient customerServiceClient, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.customerServiceClient = customerServiceClient;
        this.emailService = emailService;
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
        order.setId(UUID.randomUUID());

        Order savedOrder =
                orderRepository.save(order);

        Customer customer = customerServiceClient.getCustomer(order.getCustomerId());

        emailService.sendOrderMail(
                customer.getEmail(),
                savedOrder.getOrderNumber(),
                savedOrder.getCurrency(),
                savedOrder.getItems(),
                savedOrder.getTotalPrice());

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