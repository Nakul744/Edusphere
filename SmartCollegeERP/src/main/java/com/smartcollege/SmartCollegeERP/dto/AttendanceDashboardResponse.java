package com.smartcollege.SmartCollegeERP.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttendanceDashboardResponse {

    private long totalRecords;

    private long totalPresent;

    private long totalAbsent;

    private double overallPercentage;
}