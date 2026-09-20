package com.smartcollege.SmartCollegeERP.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fees")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Fee {

    @Id
    private String id;

    private String studentEmail;
    private String courseId;

    private double totalAmount;
    private double paidAmount;

    private FeeStatus status;
}