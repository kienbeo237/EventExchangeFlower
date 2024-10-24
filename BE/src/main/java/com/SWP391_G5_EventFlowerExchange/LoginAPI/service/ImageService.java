package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.Utils.ImageUtils;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Image;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {
    private ImageRepository imageRepository;
    private IEventFlowerPostingRepository eventFlowerPostingRepository;
    @Autowired
    public ImageService(ImageRepository imageRepository, IEventFlowerPostingRepository eventFlowerPostingRepository) {
        this.imageRepository = imageRepository;
        this.eventFlowerPostingRepository = eventFlowerPostingRepository;
    }
    public String uploadImage(MultipartFile file,int postID) throws IOException {
        EventFlowerPosting eventFlowerPosting = new EventFlowerPosting();
        if(eventFlowerPostingRepository.findById(postID).isPresent()){
            eventFlowerPosting=eventFlowerPostingRepository.findById(postID).get();
        }else {
            throw new FileNotFoundException("File not found");
        }
        Image imageData = imageRepository.save(
                Image.builder()
                .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes()))
                        .eventFlowerPosting(eventFlowerPosting)
                        .build()
                );
        if (imageData!=null){
            return "file anh upload thanh cong:" +file.getOriginalFilename();
        }return null;
    }
    public byte[] downloadImageByPostID(int postID) throws IOException {
        // Tìm bài đăng theo ID
        EventFlowerPosting posting = eventFlowerPostingRepository.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post with ID " + postID + " not found"));

        // Lấy hình ảnh liên quan đến bài đăng
        Optional<Image> image = imageRepository.findByEventFlowerPosting(posting).stream().findFirst();

        // Nếu không có hình ảnh nào được tìm thấy, ném ngoại lệ
        return image.map(img -> ImageUtils.decompressImage(img.getImageData()))
                .orElseThrow(() -> new RuntimeException("No images found for post ID: " + postID));
    }
}
