package order_management.controller;

import order_management.entity.Order;
import order_management.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
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

    @PostMapping("/createOrder")
    public Order createOrder(@RequestBody Order order){
        return orderService.createOrder(order);
    }


    /*@GetMapping("/test")
    public List<Order> test() {
        return orderService.test();
    }*/
}