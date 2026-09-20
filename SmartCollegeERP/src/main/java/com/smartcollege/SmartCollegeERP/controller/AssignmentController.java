package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.model.Assignment;
import com.smartcollege.SmartCollegeERP.model.AssignmentSubmission;
import com.smartcollege.SmartCollegeERP.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    // Admin create assignment
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<?> createAssignment(@RequestBody Assignment assignment){

        return new ApiResponse<>(
                true,
                "Assignment created",
                assignmentService.createAssignment(assignment)
        );
    }

    // Student view assignments
    @GetMapping("/{courseId}")
    public ApiResponse<?> getAssignments(@PathVariable String courseId){

        return new ApiResponse<>(
                true,
                "Assignments fetched",
                assignmentService.getAssignments(courseId)
        );
    }

    // Student submit assignment
    @PostMapping("/submit")
    public ApiResponse<?> submitAssignment(
            @RequestBody AssignmentSubmission submission){

        return new ApiResponse<>(
                true,
                "Assignment submitted",
                assignmentService.submitAssignment(submission)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/submissions/{assignmentId}")
    public ApiResponse<?> getSubmissions(@PathVariable String assignmentId){

        return new ApiResponse<>(
                true,
                "Submissions fetched",
                assignmentService.getSubmissions(assignmentId)
        );
    }
}