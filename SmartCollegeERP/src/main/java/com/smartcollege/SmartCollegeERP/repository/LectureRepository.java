package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.Lecture;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LectureRepository extends MongoRepository<Lecture, String> {

    List<Lecture> findByCourseIdOrderByOrderAsc(String courseId);
}