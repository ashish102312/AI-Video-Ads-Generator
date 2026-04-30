package com.saas.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saas.api.dto.VideoDto;
import com.saas.api.dto.VideoRequest;
import com.saas.api.model.User;
import com.saas.api.model.Video;
import com.saas.api.repository.UserRepository;
import com.saas.api.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoService {

        private final VideoRepository videoRepository;
        private final UserRepository userRepository;
        private final RestTemplate restTemplate;

        @Value("${gemini.api.key:}")
        private String geminiApiKey;

        private final String[] videoTemplates = {
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        };

        public Object createVideo(VideoRequest request, String userEmail) {
                String prompt = request.getPrompt();

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                String finalTitle = prompt.length() > 20 ? prompt.substring(0, 20) + "..." : prompt;
                String finalVideoUrl = videoTemplates[(int) (Math.random() * videoTemplates.length)];

                if (!geminiApiKey.isEmpty()) {
                        try {
                                String geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
                                                + geminiApiKey;

                                String geminiPrompt = "I am building an AI Video Ads Generator. The user provided this raw prompt: \""
                                                + prompt + "\".\n" +
                                                "Please act as an expert marketer.\n" +
                                                "1. Give me a very short, catchy 4-5 word Title for this ad.\n" +
                                                "2. Based on the user's prompt, choose ONE of these numbers that best fits the theme:\n"
                                                +
                                                "[0: Abstract/Dark, 1: Car/Automotive, 2: Tech/Digital/Web, 3: Cyber/Neon Wave, 4: Space/Particles/Science, 5: Nature/Relaxing].\n"
                                                +
                                                "Respond strictly in JSON format like this: { \"title\": \"Your Catchy Title\", \"themeIndex\": 0 }";

                                Map<String, Object> requestBody = Map.of(
                                                "contents", List.of(
                                                                Map.of("parts", List
                                                                                .of(Map.of("text", geminiPrompt)))));

                                HttpHeaders headers = new HttpHeaders();
                                headers.set("Content-Type", "application/json");

                                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

                                ResponseEntity<String> response = restTemplate.exchange(geminiUrl, HttpMethod.POST,
                                                entity,
                                                String.class);

                                ObjectMapper mapper = new ObjectMapper();
                                JsonNode root = mapper.readTree(response.getBody());
                                String textResponse = root.path("candidates").get(0).path("content").path("parts")
                                                .get(0).path("text")
                                                .asText();

                                // Extract JSON part
                                int jsonStart = textResponse.indexOf("{");
                                int jsonEnd = textResponse.lastIndexOf("}") + 1;

                                if (jsonStart != -1 && jsonEnd != -1) {
                                        String jsonString = textResponse.substring(jsonStart, jsonEnd);
                                        JsonNode jsonNode = mapper.readTree(jsonString);
                                        if (jsonNode.has("title")) {
                                                finalTitle = jsonNode.get("title").asText();
                                        }
                                        if (jsonNode.has("themeIndex")) {
                                                int index = jsonNode.get("themeIndex").asInt();
                                                if (index >= 0 && index < videoTemplates.length) {
                                                        finalVideoUrl = videoTemplates[index];
                                                }
                                        }
                                }

                        } catch (Exception e) {
                                log.error("Error communicating with Gemini API", e);
                        }
                }

                Video video = new Video();
                video.setUser_id(user.getId());
                video.setTitle(finalTitle);
                video.setPrompt(prompt);
                video.setVideoUrl(finalVideoUrl);
                video.setStatus("Ready");
                video.setViews_count(0);
                video.setThumbnail(
                                "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250");
                video.setCreated_at(LocalDateTime.now());
                video.setUpdated_at(LocalDateTime.now());

                video = videoRepository.save(video);

                return java.util.Map.of(
                                "success", true,
                                "message", "Video generated successfully!",
                                "data", java.util.Map.of(
                                                "id", video.getId(),
                                                "videoUrl", video.getVideoUrl(),
                                                "status", video.getStatus(),
                                                "prompt", video.getPrompt()));
        }

        public List<VideoDto> getVideos(String userEmail) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return videoRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                                .stream()
                                .map(v -> VideoDto.builder()
                                                .id(v.getId())
                                                .title(v.getTitle())
                                                .prompt(v.getPrompt())
                                                .videoUrl(v.getVideoUrl())
                                                .status(v.getStatus())
                                                .views(v.getViews_count())
                                                .thumbnail(v.getThumbnail())
                                                .date(v.getCreated_at())
                                                .build())
                                .collect(Collectors.toList());
        }
}
