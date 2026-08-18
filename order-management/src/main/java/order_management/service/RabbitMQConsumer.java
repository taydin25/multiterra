package order_management.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import order_management.config.RabbitMQConfig;
import order_management.entity.Customer;
import order_management.event.OrderCreatedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class RabbitMQConsumer {

    private final CustomerServiceClient customerServiceClient;
    private final EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.ORDER_CREATED_QUEUE)
    public void receiveOrderCreatedEvent(OrderCreatedEvent event) {

        //TODO only USE these log infos when you encounter an error
        /*log.info("ORDER CREATED EVENT RECEIVED");
        log.info("Order ID: {}", event.getOrderId());
        log.info("Order Number: {}", event.getOrderNumber());
        log.info("Customer ID: {}", event.getCustomerId());
        log.info("Total Price: {}", event.getTotalPrice());
        log.info("Currency: {}", event.getCurrency());*/

        try {
            Customer customer = customerServiceClient.getCustomer(event.getCustomerId());
            emailService.sendOrderMail(
                    customer.getEmail(),
                    event.getOrderNumber(),
                    event.getCurrency(),
                    event.getItems(),
                    event.getTotalPrice());
        } catch (Exception e) {
            log.error("Send Mail Error", e);
        }
    }
}
