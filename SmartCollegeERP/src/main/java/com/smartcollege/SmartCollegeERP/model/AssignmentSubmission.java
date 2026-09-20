package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Document(collection = "assignmentSubmissions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssignmentSubmission {

    @Id
    private String id;

    private String assignmentId;

    private String studentEmail;

    private String answerText;

    private LocalDateTime submittedAt;
}