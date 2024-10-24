package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;


import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetailKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailKey> {
}
