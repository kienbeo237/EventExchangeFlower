package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FeedbackService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {

    FeedbackService feedbackService;

    // Tạo mới feedback với ApiResponse
    @PostMapping("/")
    public ApiResponse<Feedback> createFeedback(@RequestBody Feedback feedback) {
        // Kiểm tra dữ liệu đầu vào
        if (feedback == null || feedback.getId() == null || feedback.getComment() == null || feedback.getRating() == 0) {
            return new ApiResponse<>(400, "Invalid feedback data", null);
        }

        // Lưu feedback
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);

        // Trả về phản hồi với ApiResponse
        return new ApiResponse<>(1000, "Feedback created successfully", savedFeedback);
    }

    // Lấy feedback theo sellerID với ApiResponse
    @GetMapping("/seller/{sellerID}")
    public ApiResponse<List<Feedback>> getFeedbackForSeller(@PathVariable int sellerID) {
        User seller = new User();
        seller.setUserID(sellerID);

        List<Feedback> feedbackList = feedbackService.getFeedbackForSeller(seller);
        return new ApiResponse<>(1000, "Feedback for seller retrieved successfully", feedbackList);
    }

    // Lấy feedback theo userID với ApiResponse
    @GetMapping("/user/{userID}")
    public ApiResponse<List<Feedback>> getFeedbackForUser(@PathVariable int userID) {
        User user = new User();
        user.setUserID(userID);

        List<Feedback> feedbackList = feedbackService.getFeedbackForUser(user);
        return new ApiResponse<>(1000, "Feedback for user retrieved successfully", feedbackList);
    }
}
