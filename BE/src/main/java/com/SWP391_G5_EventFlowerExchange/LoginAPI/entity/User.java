package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "User")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userID;

    @Column(nullable = false, length = 255)
    String username;

    @Column(nullable = false, unique = true, length = 255)
    String email;

    @Column(nullable = false, length = 255)
    String password;

    String address;

    String phoneNumber;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "role")
    Set<String> roles;

    @Column(nullable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
