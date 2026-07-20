package order_management.controller;

import order_management.entity.Order;
import order_management.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/ordermanagement")
public class OrderController {


    private final OrderService orderService;

    //Constructor Injection
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/allOrders")
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/customer/{customerId}")
    public List<Order> getOrdersByCustomerId(@PathVariable UUID customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }

    @PostMapping("/createOrder")
    public Order createOrder(@RequestBody Order order){
        return orderService.createOrder(order);
    }

    @PatchMapping("/cancellOrder/{orderNumber}")
    public Order cancellOrder(@PathVariable String orderNumber){
        return orderService.cancellOrder(orderNumber);
    }

}