package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.service.AttendanceService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // ✅ Admin marks attendance
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/mark")
    public ApiResponse<?> markAttendance(
            @RequestParam String courseId,
            @RequestParam String studentEmail,
            @RequestParam boolean present
    ){

        return new ApiResponse<>(
                true,
                "Attendance marked successfully",
                attendanceService.markAttendance(courseId, studentEmail, present)
        );
    }

    // ✅ Student view their attendance
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/student/{email}")
    public ApiResponse<?> getStudentAttendance(@PathVariable String email){

        return new ApiResponse<>(
                true,
                "Attendance fetched",
                attendanceService.getStudentAttendance(email)
        );
    }

    // ✅ Get attendance percentage
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/percentage")
    public ApiResponse<?> getPercentage(
            @RequestParam String courseId,
            @RequestParam String email
    ){

        double percentage =
                attendanceService.calculateAttendancePercentage(courseId, email);

        return new ApiResponse<>(
                true,
                "Attendance percentage",
                percentage
        );
    }

    // ✅ Admin dashboard attendance stats
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public ApiResponse<?> getDashboard(){

        return new ApiResponse<>(
                true,
                "Attendance dashboard",
                attendanceService.getAttendanceDashboard()
        );
    }
}