
package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Enrollment;
import com.smartcollege.SmartCollegeERP.model.Payment;
import com.smartcollege.SmartCollegeERP.repository.CourseRepository;
import com.smartcollege.SmartCollegeERP.repository.EnrollmentRepository;
import com.smartcollege.SmartCollegeERP.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public boolean makePayment(String courseId, String studentEmail, double amount) {
        if (studentEmail == null || studentEmail.isBlank()) {
            throw new IllegalArgumentException("Authenticated user email is missing");
        }
        if (!courseRepository.existsById(courseId)) {
            throw new IllegalArgumentException("Course not found: " + courseId);
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }

        // Already enrolled -> do not throw 500
        if (enrollmentRepository.existsByStudentEmailAndCourseId(studentEmail, courseId)) {
            return false;
        }

        Payment payment = Payment.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .amount(amount)
                .status("SUCCESS")
                .paymentDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);

        Enrollment enrollment = Enrollment.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .enrolledAt(LocalDateTime.now())
                .build();

        enrollmentRepository.save(enrollment);
        return true;
    }
}