package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.IOrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    IOrderService orderService;

    // Create a new order
    @PostMapping("/")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        try {
            // Validate order
            if (order == null || order.getUser() == null || order.getTotalPrice() <= 0) {
                return ResponseEntity.badRequest().body("Invalid order details."); // Return 400 Bad Request
            }

            // Create the order
            Order createdOrder = orderService.insertOrder(order);
            String vnPayURL = "";

            // Generate payment URL if applicable
            if (order.getPayment().getPaymentID() == 1) {
                vnPayURL = orderService.createVNPayUrl(createdOrder);
                System.out.println("VNPay URL: " + vnPayURL);
            }

            return ResponseEntity.status(201).body(vnPayURL); // Return 201 Created with URL
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Order not found."); // Return 404 Not Found
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid argument: " + e.getMessage()); // Return 400 Bad Request
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage()); // Return 500 Internal Server Error
        }
    }

    // Handle payment success
    @PostMapping("/payments/success")
    public ResponseEntity<String> paymentSuccess(@RequestParam Map<String, String> params) {
        try {
            String responseCode = params.get("vnp_ResponseCode");
            String transactionStatus = params.get("vnp_TransactionStatus");
            String txnRef = params.get("vnp_TxnRef");

            // Update order status based on payment response
            if ("00".equals(responseCode) && "00".equals(transactionStatus)) {
                orderService.updateOrderStatus(Integer.parseInt(txnRef), "Paid");
                return ResponseEntity.ok("Payment success. Order status updated.");
            } else if ("24".equals(responseCode) && "02".equals(transactionStatus)) {
                orderService.updateOrderStatus(Integer.parseInt(txnRef), "Canceled");
                return ResponseEntity.ok("Payment was canceled. Order status updated.");
            }

            return ResponseEntity.badRequest().body("Payment failed or invalid response.");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid transaction reference.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // Retrieve all orders
    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Retrieve order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable int id) {
        try {
            Order order = orderService.getOrderById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Order not found"));
            return ResponseEntity.ok(order);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(null); // Return 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Return 500 Internal Server Error
        }
    }

    // Update an existing order
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable int id, @RequestBody Order order) {
        try {
            Order updatedOrder = orderService.updateOrder(id, order);
            return ResponseEntity.ok(updatedOrder);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(null); // Return 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Return 500 Internal Server Error
        }
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable int id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok("Order deleted successfully!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Order not found."); // Return 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage()); // Return 500 Internal Server Error
        }
    }

    // Cancel payment
    @DeleteMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelPayment(@PathVariable int orderId) {
        try {
            orderService.cancelPayment(orderId);
            return ResponseEntity.ok("Payment canceled successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Order not found.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while canceling the payment.");
        }
    }
}
