package com.saas.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "videos")
public class Video {
    @Id
    private String id;
    private String user_id;
    private String title;
    private String prompt;
    private String videoUrl;
    private String status = "Ready";
    private int views_count = 0;
    private String thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250";
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime updated_at = LocalDateTime.now();
}
