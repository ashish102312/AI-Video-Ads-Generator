package com.saas.api.service;

import com.saas.api.model.User;
import com.saas.api.model.Video;
import com.saas.api.repository.UserRepository;
import com.saas.api.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    public Object getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalVideos = videoRepository.count();

        List<Video> videos = videoRepository.findAll();
        int totalViews = videos.stream().mapToInt(Video::getViews_count).sum();

        List<User> recentUsers = userRepository.findAll().stream()
                .sorted((u1, u2) -> u2.getCreated_at().compareTo(u1.getCreated_at()))
                .limit(10)
                .collect(Collectors.toList());

        List<Object> formattedUsers = recentUsers.stream().map(u -> new Object() {
            public String id = u.getId();
            public String name = u.getName();
            public String email = u.getEmail();
            public String plan = "admin".equals(u.getRole()) ? "Enterprise" : "Basic";
            public String status = "Active";
            public Object date = u.getCreated_at();
        }).collect(Collectors.toList());

        return new Object() {
            public boolean success = true;
            public Object data = new Object() {
                public Object metrics = new Object() {
                    public long totalUsers = AdminService.this.userRepository.count();
                    public long totalVideos = AdminService.this.videoRepository.count();
                    public int totalViews = AdminService.this.videoRepository.findAll().stream()
                            .mapToInt(Video::getViews_count).sum();
                    public int activeSessions = (int) (Math.random() * 50) + 1;
                };
                public List<Object> recentUsers = formattedUsers;
            };
        };
    }
}
