
package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.dto.MarkAttendanceRequest;
import com.smartcollege.SmartCollegeERP.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // Admin marks attendance (supports JSON body or query parameters)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    @PostMapping("/mark")
    public ApiResponse<?> markAttendance(
            @RequestBody(required = false) MarkAttendanceRequest request,
            @RequestParam(required = false) String courseId,
            @RequestParam(required = false) String studentEmail,
            @RequestParam(required = false) Boolean present
    ) {
        String finalCourseId = (request != null && request.getCourseId() != null)
                ? request.getCourseId()
                : courseId;

        String finalEmail = (request != null && request.getStudentEmail() != null)
                ? request.getStudentEmail()
                : studentEmail;

        boolean finalPresent = (request != null)
                ? request.isPresent()
                : Boolean.TRUE.equals(present);

        return new ApiResponse<>(
                true,
                "Attendance marked successfully",
                attendanceService.markAttendance(finalCourseId, finalEmail, finalPresent)
        );
    }

    // Student view their attendance
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'STUDENT', 'ROLE_ADMIN', 'ADMIN')")
    @GetMapping("/student/{email}")
    public ApiResponse<?> getStudentAttendance(@PathVariable String email) {
        return new ApiResponse<>(
                true,
                "Attendance fetched",
                attendanceService.getStudentAttendance(email)
        );
    }

    // Get attendance percentage
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'STUDENT', 'ROLE_ADMIN', 'ADMIN')")
    @GetMapping("/percentage")
    public ApiResponse<?> getPercentage(
            @RequestParam String courseId,
            @RequestParam String email
    ) {
        double percentage = attendanceService.calculateAttendancePercentage(courseId, email);

        return new ApiResponse<>(
                true,
                "Attendance percentage",
                percentage
        );
    }

    // Admin dashboard attendance stats
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    @GetMapping("/dashboard")
    public ApiResponse<?> getDashboard() {
        return new ApiResponse<>(
                true,
                "Attendance dashboard",
                attendanceService.getAttendanceDashboard()
        );
    }
}