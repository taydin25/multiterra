package order_management.repository;

import order_management.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByCustomerId(UUID customerId);
    Order findByOrderNumber(String orderNumber);

}