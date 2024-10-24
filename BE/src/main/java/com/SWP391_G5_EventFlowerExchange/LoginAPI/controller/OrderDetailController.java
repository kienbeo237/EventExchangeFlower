package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;


import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetailKey;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.IOrderDetailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailController {

    IOrderDetailService orderDetailService;

    @PostMapping("/")
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return ResponseEntity.ok(orderDetailService.createOrderDetail(orderDetail));
    }

    @GetMapping("/")
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        return ResponseEntity.ok(orderDetailService.getAllOrderDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetail(@PathVariable OrderDetailKey id) {
        return ResponseEntity.ok(orderDetailService.getOrderDetail(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable OrderDetailKey id, @RequestBody OrderDetail orderDetail) {
        return ResponseEntity.ok(orderDetailService.updateOrderDetail(id, orderDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderDetail(@PathVariable OrderDetailKey id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.ok("OrderDetail deleted!");
    }
}

