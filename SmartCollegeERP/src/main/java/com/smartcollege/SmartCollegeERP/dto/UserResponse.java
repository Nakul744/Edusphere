package com.smartcollege.SmartCollegeERP.dto;

import com.smartcollege.SmartCollegeERP.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    private String email;
    private Role role;
}