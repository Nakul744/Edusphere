package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {

    @Id
    private String id;

    private String courseId;

    private String title;

    private String description;

    private LocalDateTime dueDate;
}