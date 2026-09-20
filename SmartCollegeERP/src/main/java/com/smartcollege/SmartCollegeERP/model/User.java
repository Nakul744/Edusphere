package com.smartcollege.SmartCollegeERP.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private Role role;

    private String name;
    private String phone;
}