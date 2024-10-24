package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Category")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryID;

    @Column(nullable = false)
    private String flowerType;

    @Column(nullable = false, columnDefinition = "nvarchar(255) DEFAULT 'Available'")
    private String description = "Available";

    private String imageUrl;

    private String eventType;

    private String eventName;

    private String categoryName;
}
