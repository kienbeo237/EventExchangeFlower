package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@Data
@NoArgsConstructor
public class Feedback {

    @EmbeddedId
    private FeedbackKey id;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false, insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "sellerID", nullable = false, insertable = false, updatable = false)
    private User seller;

}
