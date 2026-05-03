package customermanagement;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;


import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CustomerManagementAppControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createCustomerTest() throws Exception {

        String json = """
        {
          "name":"Tunahan",
          "surname":"Aydin",
          "email":"tunahan@gmail.com"
        }
        """;

        mockMvc.perform(post("/customermanagement/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }
}