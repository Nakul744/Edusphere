package com.smartcollege.SmartCollegeERP.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDashboardResponse {
    private long totalRecords;
    private long totalPresent;
    private long totalAbsent;
    private double overallPercentage;
}