package com.smartcollege.SmartCollegeERP.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsResponse {

    private long totalUsers;
    private long totalStudents;
    private long totalEnrollments;

    private double totalRevenue;   // ✅ NEW
}