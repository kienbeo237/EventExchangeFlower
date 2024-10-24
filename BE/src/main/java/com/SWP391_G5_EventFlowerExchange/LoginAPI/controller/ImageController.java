package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/img")
@CrossOrigin("http://localhost:3000")
public class ImageController {
    @Autowired
    private ImageService imageService;
    @PostMapping("/{postID}")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file, @PathVariable("postID") int postID)
    throws IOException {
        String uploadImage =imageService.uploadImage(file,postID);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }
    @GetMapping("/{postID}")
    public ResponseEntity<?> downloadImageByPostID(@PathVariable("postID") int postID) throws IOException {
        byte[] imageData = imageService.downloadImageByPostID(postID);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }}
