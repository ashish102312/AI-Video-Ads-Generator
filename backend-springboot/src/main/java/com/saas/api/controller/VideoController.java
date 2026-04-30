package com.saas.api.controller;

import com.saas.api.dto.ApiResponse;
import com.saas.api.dto.VideoDto;
import com.saas.api.dto.VideoRequest;
import com.saas.api.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    public ResponseEntity<Object> createVideo(@RequestBody VideoRequest request, Authentication authentication) {
        if (request.getPrompt() == null || request.getPrompt().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Prompt is required"));
        }
        return ResponseEntity.ok(videoService.createVideo(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<VideoDto>>> getVideos(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(videoService.getVideos(authentication.getName())));
    }
}
