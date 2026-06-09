package customermanagement.repository;


import customermanagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Optional<Customer> findByNationalId(String nationalId);
    Optional<Customer> findByUsernameAndPassword(String username, String password);

}