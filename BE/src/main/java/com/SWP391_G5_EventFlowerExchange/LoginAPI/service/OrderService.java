package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.configuration.VNPayConfig;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.*;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {
    IOrderRepository iOrderRepository;
    IOrderDetailRepository iOrderDetailRepository;
    IDeliveryRepository iDeliveryRepository;
    IPaymentRepository iPaymentRepository;

    @Override
    public Order insertOrder(Order order) {
        // Save order to the database
        return iOrderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return iOrderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(int orderId) {
        return iOrderRepository.findById(orderId);
    }

    @Override
    public Order updateOrder(int orderId, Order order) {
        Order existingOrder = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Update non-null fields
        if (order.getTotalPrice() != 0) {
            existingOrder.setTotalPrice(order.getTotalPrice());
        }

        if (order.getShippingAddress() != null && !order.getShippingAddress().isEmpty()) {
            existingOrder.setShippingAddress(order.getShippingAddress());
        }

        if (order.getStatus() != null && !order.getStatus().isEmpty()) {
            existingOrder.setStatus(order.getStatus());
        }

        existingOrder.setUpdatedAt(LocalDateTime.now());

        return iOrderRepository.save(existingOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(int orderId) {
        iOrderRepository.deleteById(orderId);
    }

    @Transactional
    public Order saveOrder(Order order, List<OrderDetail> orderDetails) {
        // Save Order
        Order savedOrder = iOrderRepository.save(order);

        // Save OrderDetails associated with the saved Order
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(savedOrder); // Establish relationship with saved Order
            iOrderDetailRepository.save(orderDetail);
        }

        return savedOrder;
    }

    // Create VNPay payment URL
    public String createVNPayUrl(Order order) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        double totalAmount = order.getTotalPrice() * 100; // Convert to VND
        String amount = String.valueOf(Math.round(totalAmount));

        // Create VNPay parameters
        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", String.valueOf(order.getOrderID()));
        vnp_Params.put("vnp_OrderInfo", "Order information: " + order.getOrderID());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Amount", amount);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_CreateDate", formattedCreateDate);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");

        // Create signing data string
        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(VNPayConfig.vnp_HashSecret, signData);
        vnp_Params.put("vnp_SecureHash", signed);

        // Build the final payment URL
        StringBuilder urlBuilder = new StringBuilder(VNPayConfig.vnp_Url);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }

    // HMAC SHA512 function
    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    @Transactional
    public void cancelPayment(int orderId) {
        Order order = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Update order status to canceled
        order.setStatus("Canceled");
        order.setUpdatedAt(LocalDateTime.now());

        iOrderRepository.save(order);
    }

    public void updateOrderStatus(int orderId, String status) {
        Order order = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found!"));
        order.setStatus(status); // Update status
        order.setUpdatedAt(LocalDateTime.now()); // Update timestamp
        iOrderRepository.save(order); // Save changes
    }
}
