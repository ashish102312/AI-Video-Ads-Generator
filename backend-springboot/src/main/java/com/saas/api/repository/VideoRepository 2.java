package com.saas.api.repository;

import com.saas.api.model.Video;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    @Query(value = "{ 'user_id' : ?0 }", sort = "{ 'created_at' : -1 }")
    List<Video> findByUserIdOrderByCreatedAtDesc(String userId);
}
