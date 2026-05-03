package customermanagement.controller;

import customermanagement.entity.Customer;
import customermanagement.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("customermanagement/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable UUID id) {
        return customerRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable UUID id) {
        customerRepository.deleteById(id);
    }
}