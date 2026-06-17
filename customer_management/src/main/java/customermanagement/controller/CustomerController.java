package customermanagement.controller;

import customermanagement.entity.Customer;
import customermanagement.enums.CustomerStatus;
import customermanagement.enums.UserRole;
import customermanagement.exceptions.CustomerAlreadyExistsException;
import customermanagement.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
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

        Customer customerByNationalId = getCustomerByNationalId(customer.getNationalId());

        if(customerByNationalId != null){
            throw new CustomerAlreadyExistsException("Customer already exists with National Id: " + customer.getNationalId());
        }

        customer.setRole(UserRole.CUSTOMER);//DEFAULT
        customer.setStatus(String.valueOf(CustomerStatus.ACTIVE));//DEFAULT
        customer.setCreated_date(LocalDateTime.now());
        customer.setUpdated_date(LocalDateTime.now());
        String fullAddress=customer.getAddress()+","+customer.getDistrict()+","+customer.getCity()+"/"+customer.getCountry();
        customer.setFullAddress(fullAddress);

        return customerRepository.save(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable UUID id) {
        return customerRepository.findById(id).orElse(null);
    }

    @PostMapping("/login")
    public Customer login(@RequestBody Customer customer) {
        return customerRepository.findByUsernameAndPassword(customer.getUsername(), customer.getPassword()).orElse(null);
    }

    @GetMapping("/getCustomerByNationalId/{nationalId}")
    public Customer getCustomerByNationalId(@PathVariable String nationalId) {
        return customerRepository.findByNationalId(nationalId).orElse(null);
    }

    @PutMapping("/updateCustomer/{customerId}")
    public Customer  updateCustomer(@RequestBody Customer customer, @PathVariable UUID customerId)
    {
        Customer updateCustomer = customerRepository.findById(customerId).orElse(null);
        updateCustomer.setName(customer.getName());
        updateCustomer.setSurname(customer.getSurname());
        updateCustomer.setEmail(customer.getEmail());
        updateCustomer.setPhone_number(customer.getPhone_number());
        updateCustomer.setAddress(customer.getAddress());
        updateCustomer.setUpdated_date(LocalDateTime.now());

        return customerRepository.save(updateCustomer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable UUID id) {
        customerRepository.deleteById(id);
    }


}