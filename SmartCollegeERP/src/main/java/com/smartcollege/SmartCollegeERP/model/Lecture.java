package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lectures")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lecture {

    @Id
    private String id;

    private String courseId;

    private String title;

    private String videoUrl;

    private String pdfUrl;

    private int order;
}