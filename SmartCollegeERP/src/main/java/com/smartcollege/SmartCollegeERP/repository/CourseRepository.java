package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
}