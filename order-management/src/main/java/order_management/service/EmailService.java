package order_management.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import order_management.entity.OrderItem;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;


    public void sendOrderMail(
            String to,
            String orderNumber,
            String currency,
            List<OrderItem> orderItem,
            BigDecimal totalPrice) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        String products = orderItem.stream()
                .map(OrderItem::getProductName)
                .collect(Collectors.joining("\n"));

        message.setTo(to);

        message.setSubject(
                "Multiterra Order Confirmation");

        message.setText(
                "Your order has been created.\n\n" +
                        "Order Number: " + orderNumber + "\n" +
                        "Total Price: " + totalPrice + " " + currency + "\n" +
                        "Products: \n" + products);

        mailSender.send(message);
    }
}