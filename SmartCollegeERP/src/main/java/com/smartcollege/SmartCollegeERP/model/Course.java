package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {

    @Id
    private String id;

    private String title;
    private String description;
    private String duration;

    private String createdBy;

    private double price;

    private String photoUrl; // ✅ course image url
}