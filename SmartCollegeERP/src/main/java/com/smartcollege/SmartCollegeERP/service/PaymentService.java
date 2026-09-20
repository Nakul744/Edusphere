package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Enrollment;
import com.smartcollege.SmartCollegeERP.model.Payment;
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

    public void makePayment(String courseId, String studentEmail, double amount){

        // Check if already enrolled
        if(enrollmentRepository.existsByStudentEmailAndCourseId(studentEmail, courseId)){
            throw new RuntimeException("Already enrolled in this course");
        }

        // Save payment
        Payment payment = Payment.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .amount(amount)
                .status("SUCCESS")
                .paymentDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);

        // Create enrollment
        Enrollment enrollment = Enrollment.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .enrolledAt(LocalDateTime.now())
                .build();

        enrollmentRepository.save(enrollment);
    }
}