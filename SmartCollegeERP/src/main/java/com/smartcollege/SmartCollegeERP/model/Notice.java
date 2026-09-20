package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notices")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notice {

    @Id
    private String id;

    private String title;

    private String message;

    private String courseId; // optional (null = all students)

    private LocalDateTime createdAt;

    private String createdBy; // admin email
}