package order_management.repository;

import order_management.entity.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderItemRepository
        extends MongoRepository<OrderItem, UUID> {
}