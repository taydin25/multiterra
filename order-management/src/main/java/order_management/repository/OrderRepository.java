package order_management.repository;

import order_management.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface OrderRepository extends MongoRepository<Order, String> {

}