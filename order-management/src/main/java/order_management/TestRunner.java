package order_management;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import order_management.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TestRunner implements CommandLineRunner {

    private final OrderRepository orderRepository;

//   @Value("${spring.data.mongodb.uri}")
//   private String mongoUri;

    @Override
    public void run(String... args) {
        System.out.println("COUNT = " + orderRepository.count());
        System.out.println(orderRepository.findAll());

//        System.out.println("MONGO URI = " + mongoUri);
    }
}