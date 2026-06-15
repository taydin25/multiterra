package order_management.service;

import lombok.RequiredArgsConstructor;
import order_management.entity.Customer;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceClient {

    private final RestTemplate restTemplate;

    public Customer getCustomer(UUID customerId) {

        return restTemplate.getForObject(
                "http://localhost:8080/customermanagement/customers/" + customerId,
                Customer.class
        );
    }
}