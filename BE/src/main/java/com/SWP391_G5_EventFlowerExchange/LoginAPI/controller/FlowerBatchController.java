package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FlowerBatchSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/flower")
public class FlowerBatchController {
    @Autowired
    private FlowerBatchSerivice flowerBatchSerivice;
    @GetMapping("/")
    public ResponseEntity<List<FlowerBatch>> fetchAll() {

        return ResponseEntity.ok(flowerBatchSerivice.getAllFlowerBatch()) ;
    }
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public List<FlowerBatch> saveFlowers(@RequestBody List<FlowerBatch> flowers) {
        return flowerBatchSerivice.insertFlowerBatch(flowers);
    }
    @PutMapping("/{id}")
    public ResponseEntity<FlowerBatch> updateFlowerId(@PathVariable int id, @RequestBody FlowerBatch fb) {
        FlowerBatch updatedFlowerId = flowerBatchSerivice.updateFlowerBatch(id, fb);
        return ResponseEntity.ok(updatedFlowerId);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFlower(@PathVariable int id) {
        flowerBatchSerivice.deleteFlowerBatch(id);
        return ResponseEntity.ok("Deleted!");
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<FlowerBatch>> getFbyId(@PathVariable int id) {
        Optional<FlowerBatch> fb= flowerBatchSerivice.getFlowerBatchById(id);
        return ResponseEntity.ok(fb);
    }
    @PostMapping("/{postID}/flowers")
    public ResponseEntity<FlowerBatch> createFlower(
            @PathVariable int postID, // Nhận postID từ URL
            @RequestBody Map<String, Integer> requestBody) { // Nhận flowerID từ body

        Integer flowerID = requestBody.get("flowerID");

        // Tạo một đối tượng FlowerBatch
        FlowerBatch flowerBatch = new FlowerBatch();
        flowerBatch.setFlowerID(flowerID); // Giả sử bạn có phương thức setFlowerID trong FlowerBatch

        // Gọi phương thức createFlower với đối tượng FlowerBatch
        FlowerBatch createdFlower = flowerBatchSerivice.createFlower(flowerBatch, postID);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFlower);
    }

}
