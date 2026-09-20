package com.smartcollege.SmartCollegeERP.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {

    private long totalUsers;
    private long totalStudents;
    private long totalAdmins;

    private long totalCourses;
    private long totalEnrollments;

    private double totalRevenue;
    private double avgAttendance;
}