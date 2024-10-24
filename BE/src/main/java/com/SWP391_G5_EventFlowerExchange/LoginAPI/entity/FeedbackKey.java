package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackKey implements Serializable {
    private int userID;
    private int sellerID;

}
