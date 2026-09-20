package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {

    List<Enrollment> findByStudentEmail(String studentEmail);

    List<Enrollment> findByCourseId(String courseId);

    boolean existsByStudentEmailAndCourseId(String studentEmail, String courseId);

    void deleteByStudentEmail(String studentEmail);
    boolean existsByCourseIdAndStudentEmail(String courseId, String studentEmail);
}