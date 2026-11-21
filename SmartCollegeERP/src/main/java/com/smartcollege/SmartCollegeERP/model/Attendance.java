

package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "attendance")
public class Attendance {

    @Id
    private String id;

    private String courseId;

    private String studentEmail;

    private LocalDate date;

    private boolean present;
}