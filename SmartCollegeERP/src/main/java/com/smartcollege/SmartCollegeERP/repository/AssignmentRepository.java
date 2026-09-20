package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssignmentRepository extends MongoRepository<Assignment,String> {

    List<Assignment> findByCourseId(String courseId);

}