package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.PostingCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.AppException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.ErrorCode;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.ImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventFlowerPostingService implements IEventFlowerPostingService {

    IUserRepository iUserRepository;
    IEventFlowerPostingRepository iEventFlowerPostingRepository;
    ImageRepository imageRepository;

    @Override
    public List<EventFlowerPosting> getAllEventPostings() {
        return iEventFlowerPostingRepository.findAll();
    }

    @Override
    public EventFlowerPosting insertEventFlowerPosting(EventFlowerPosting eventFlowerPosting) {
        return iEventFlowerPostingRepository.save(eventFlowerPosting);
    }

    @Override
    public EventFlowerPosting updateEventFlowerPosting(int postId, EventFlowerPosting eventFlowerPosting) {
        EventFlowerPosting post= iEventFlowerPostingRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Cập nhật các trường từ eventFlowerPosting nếu không null
        if (eventFlowerPosting.getTitle() != null) {
            post.setTitle(eventFlowerPosting.getTitle());
        }
        if (eventFlowerPosting.getDescription() != null) {
            post.setDescription(eventFlowerPosting.getDescription());
        }
        if (eventFlowerPosting.getPrice() != null) {
            post.setPrice(eventFlowerPosting.getPrice());
        }
        if (eventFlowerPosting.getImageUrl() != null) {
            post.setImageUrl(eventFlowerPosting.getImageUrl());
        }
        if (eventFlowerPosting.getStatus() != null) {
            post.setStatus(eventFlowerPosting.getStatus());
        }
        if (eventFlowerPosting.getUpdatedAt() != null) {
            post.setUpdatedAt(eventFlowerPosting.getUpdatedAt());
        }
        iEventFlowerPostingRepository.save(post);


        return post;
    }

    @Override
    public void deleteEventFlowerPosting(int postID) {
        imageRepository.deleteByEventFlowerPosting_PostID(postID);
        iEventFlowerPostingRepository.deleteById(postID);
    }

    @Override
    public Optional<EventFlowerPosting> getEventFlowerPostingById(int postId) {
        return iEventFlowerPostingRepository.findById(postId);
    }

    @Override
    public List<EventFlowerPosting> searchByKeyword(String title) {
        return iEventFlowerPostingRepository.searchByTitle(title);
    }

    @Override
    public List<EventFlowerPosting> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return iEventFlowerPostingRepository.searchByPriceRange(minPrice, maxPrice);
    }

    @Override
    public boolean deleteFlowerBatch(int postID, int flowerID) {
        Optional<EventFlowerPosting> optionalPost = iEventFlowerPostingRepository.findById(postID);
        if (optionalPost.isPresent()) {
            EventFlowerPosting post = optionalPost.get();
            List<FlowerBatch> flowerBatches = post.getFlowerBatches();
            FlowerBatch flowerBatchToRemove = null;
            for (FlowerBatch flowerBatch : flowerBatches) {
                if (flowerBatch.getFlowerID() == flowerID) {
                    flowerBatchToRemove = flowerBatch;
                    break;
                }
            }
            if (flowerBatchToRemove != null) {
                flowerBatches.remove(flowerBatchToRemove);
                post.setFlowerBatches(flowerBatches);
                iEventFlowerPostingRepository.save(post);
                return true;
            }
        }
        return false; // Không tìm thấy bài đăng hoặc hoa
    }



    @Override
    public EventFlowerPosting createPostByID(int userID, PostingCreationRequest request) {

        User user = iUserRepository.findById(userID)
                .orElseThrow(() -> new AppException(ErrorCode.USERID_NOT_FOUND));

        EventFlowerPosting post=  new EventFlowerPosting();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setPrice(request.getPrice());
        post.setImageUrl(request.getImageUrl());
        post.setStatus(request.getStatus());
        post.setUser(user);
        return iEventFlowerPostingRepository.save(post);
    }
    public List<EventFlowerPosting> getPostsByUserId(int userID) {
        User user = iUserRepository.findById(userID).orElse(null);
        if (user != null) {
            return iEventFlowerPostingRepository.findByUser(user);
        }
        return Collections.emptyList();
    }
}
