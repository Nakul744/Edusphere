

package com.smartcollege.SmartCollegeERP.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarkAttendanceRequest {

    private String courseId;

    private String studentEmail;

    private boolean present;
}