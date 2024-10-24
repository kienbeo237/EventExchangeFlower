package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;

import java.util.List;
import java.util.Optional;

public interface IOrderService {
    Order insertOrder(Order order);
    List<Order> getAllOrders();
    Optional<Order> getOrderById(int orderId);
    Order updateOrder(int orderId, Order order);
    void deleteOrder(int orderId);
    String createVNPayUrl(Order order) throws Exception; // Declare the exception if needed
    void cancelPayment(int orderId);
    void updateOrderStatus(int orderId, String status);
}
