package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "enrollments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Enrollment {

    @Id
    private String id;

    private String courseId;

    private String studentEmail;

    private LocalDateTime enrolledAt;
}