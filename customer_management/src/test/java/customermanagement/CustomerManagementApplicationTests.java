package customermanagement;

import customermanagement.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.assertEquals;



@SpringBootTest
class CustomerManagementApplicationTests {

	@Test
	void contextLoads() {
	}

    @Test
    void testCustomerFields() {

        Customer customer = new Customer();

        UUID id = UUID.randomUUID();
        customer.setCustomerId(id);
        customer.setName("Tunahan");
        customer.setEmail("tunahan@gmail.com");

        assertEquals(id, customer.getCustomerId());
        assertEquals("Tunahan", customer.getName());
        assertEquals("tunahan@gmail.com", customer.getEmail());
    }

}
