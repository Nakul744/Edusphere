package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Course;
import com.smartcollege.SmartCollegeERP.model.Enrollment;
import com.smartcollege.SmartCollegeERP.repository.CourseRepository;
import com.smartcollege.SmartCollegeERP.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    // ✅ Create Course
    public Course createCourse(Course course, String adminEmail) {
        course.setCreatedBy(adminEmail);
        return courseRepository.save(course);
    }

    // ✅ Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // ✅ Delete Course
    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }


    public void enroll(String courseId, String studentEmail){

        if(enrollmentRepository
                .existsByStudentEmailAndCourseId(studentEmail, courseId)){

            throw new RuntimeException("Student already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .build();

        enrollmentRepository.save(enrollment);
    }

    // ✅ Get My Courses (NEW CLEAN WAY)
    public List<Course> getMyCourses(String studentEmail){

        List<Enrollment> enrollments =
                enrollmentRepository.findByStudentEmail(studentEmail);

        List<String> courseIds = enrollments.stream()
                .map(Enrollment::getCourseId)
                .toList();

        return courseRepository.findAllById(courseIds);
    }
}