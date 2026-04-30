package com.saas.api.dto;

import lombok.Data;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@Builder
public class VideoDto {
    private String id;
    private String title;
    private String prompt;
    private String videoUrl;
    private String status;
    private int views;
    private String thumbnail;
    private LocalDateTime date;
}
