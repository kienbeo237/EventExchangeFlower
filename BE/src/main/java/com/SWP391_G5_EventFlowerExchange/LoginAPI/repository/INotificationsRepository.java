package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INotificationsRepository extends JpaRepository<Notifications, Integer> {
    void deleteByUser_userID(int userId);
}
