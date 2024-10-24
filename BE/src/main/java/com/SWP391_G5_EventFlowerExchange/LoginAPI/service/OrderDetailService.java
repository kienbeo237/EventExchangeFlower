package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;



import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetailKey;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService {

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail getOrderDetail(OrderDetailKey id) {
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
    }

    @Override
    public OrderDetail updateOrderDetail(OrderDetailKey id, OrderDetail orderDetail) {
        OrderDetail existingOrderDetail = getOrderDetail(id);
        existingOrderDetail.setQuantity(orderDetail.getQuantity());
        existingOrderDetail.setPrice(orderDetail.getPrice());
        existingOrderDetail.setFlowerBatch(orderDetail.getFlowerBatch());
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    public void deleteOrderDetail(OrderDetailKey id) {
        orderDetailRepository.deleteById(id);
    }
}
