package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends MongoRepository<Attendance, String> {

    List<Attendance> findByStudentEmail(String studentEmail);

    List<Attendance> findByCourseIdAndStudentEmail(String courseId, String studentEmail);

    List<Attendance> findByCourseIdAndDate(String courseId, LocalDate date);

    boolean existsByCourseIdAndStudentEmailAndDate(
            String courseId,
            String studentEmail,
            LocalDate date
    );
    void deleteByStudentEmail(String studentEmail);
}