package order_management.service;

import lombok.RequiredArgsConstructor;
import order_management.entity.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceClient {

    private final RestTemplate restTemplate;

    @Value("${customer.service.url}")
    private String customerServiceUrl;

    public Customer getCustomer(UUID customerId) {

        return restTemplate.getForObject(
                customerServiceUrl+"/customermanagement/customers/" + customerId,
                Customer.class
        );
    }
}