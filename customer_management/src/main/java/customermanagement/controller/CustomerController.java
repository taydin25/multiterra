package customermanagement.controller;

import customermanagement.entity.Customer;
import customermanagement.enums.CustomerStatus;
import customermanagement.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("customermanagement/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/getAllCustomers")
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping("/createCustomer")
    public Customer createCustomer(@RequestBody Customer customer) {

        customer.setStatus(String.valueOf(CustomerStatus.INACTIVE));
        customer.setCreated_date(LocalDateTime.now());
        customer.setUpdated_date(LocalDateTime.now());

        return customerRepository.save(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable UUID id) {
        return customerRepository.findById(id).orElse(null);
    }

    @GetMapping("/getCustomerByNationalId/{nationalId}")
    public Customer getCustomerByNationalId(@PathVariable String nationalId) {
        return customerRepository.findByNationalId(nationalId).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable UUID id) {
        customerRepository.deleteById(id);
    }


}