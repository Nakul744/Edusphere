package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Assignment;
import com.smartcollege.SmartCollegeERP.model.AssignmentSubmission;
import com.smartcollege.SmartCollegeERP.repository.AssignmentRepository;
import com.smartcollege.SmartCollegeERP.repository.AssignmentSubmissionRepository;
import com.smartcollege.SmartCollegeERP.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;
    private final EnrollmentRepository enrollmentRepository;

    // Admin create assignment
    public Assignment createAssignment(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

    // Student get assignments (only if enrolled)
    public List<Assignment> getAssignments(String courseId){

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();

        boolean isAdmin =
                auth.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        // Admin can view assignments without enrollment
        if(isAdmin){
            return assignmentRepository.findByCourseId(courseId);
        }

        boolean enrolled =
                enrollmentRepository.existsByCourseIdAndStudentEmail(courseId,email);

        if(!enrolled){
            throw new RuntimeException("Not enrolled in this course");
        }

        return assignmentRepository.findByCourseId(courseId);
    }
    // Student submit assignment
    public AssignmentSubmission submitAssignment(AssignmentSubmission submission){

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();

        submission.setStudentEmail(email);
        submission.setSubmittedAt(LocalDateTime.now());

        return submissionRepository.save(submission);
    }
    public List<AssignmentSubmission> getSubmissions(String assignmentId){

        return submissionRepository.findByAssignmentId(assignmentId);

    }
}