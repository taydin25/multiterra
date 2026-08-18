package order_management.service;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.extern.slf4j.Slf4j;
import order_management.event.OrderItemEvent;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import order_management.entity.OrderItem;

import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
public class EmailService {

    private final Resend resend;

    public EmailService(@Value("${resend.api.key}") String apiKey) {
        this.resend = new Resend(apiKey);
    }

    public void sendOrderMail(
            String email,
            String orderNumber,
            String currency,
            List<OrderItemEvent> items,
            BigDecimal totalPrice
    ) {

        StringBuilder itemsHtml = createItemsHtml(currency, items);

        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif;">

                    <h2>Order Confirmation</h2>

                    <p>Thank you for your order.</p>

                    <p>
                        <strong>Order Number:</strong> %s
                    </p>

                    <table style="width: 100%%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="text-align: left; padding: 8px;">
                                    Product
                                </th>
                                <th style="text-align: left; padding: 8px;">
                                    Quantity
                                </th>
                                <th style="text-align: left; padding: 8px;">
                                    Unit Price
                                </th>
                                <th style="text-align: left; padding: 8px;">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            %s
                        </tbody>
                    </table>

                    <h3>
                        Total: %.2f %s
                    </h3>

                </body>
                </html>
                """.formatted(
                orderNumber,
                itemsHtml,
                totalPrice,
                currency
        );

        try {

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("onboarding@resend.dev")
                    .to(email)
                    .subject("Order Confirmation - " + orderNumber)
                    .html(html)
                    .build();

            CreateEmailResponse response = resend.emails().send(params);

            log.info(
                    "Order email sent successfully. OrderNumber={}, Email={}, ResendId={}",
                    orderNumber,
                    email,
                    response.getId()
            );

        } catch (Exception e) {

            log.error(
                    "Failed to send order email. OrderNumber={}, Email={}",
                    orderNumber,
                    email,
                    e
            );
        }
    }

    private static @NonNull StringBuilder createItemsHtml(String currency, List<OrderItemEvent> items) {
        StringBuilder itemsHtml = new StringBuilder();

        for (OrderItemEvent item : items) {
            itemsHtml.append("""
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                            %s
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                            %d
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                            %.2f %s
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                            %.2f %s
                        </td>
                    </tr>
                    """.formatted(
                    item.getProductName(),
                    item.getQuantity(),
                    item.getUnitPrice(),
                    currency,
                    item.getTotalPrice(),
                    currency
            ));
        }
        return itemsHtml;
    }
}