package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.dto.ChangePasswordRequest;
import com.smartcollege.SmartCollegeERP.dto.UpdateProfileRequest;
import com.smartcollege.SmartCollegeERP.dto.UserResponse;
import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.repository.UserRepository;
import com.smartcollege.SmartCollegeERP.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
    private final UserService userService;

    // ✅ GET PROFILE
    @GetMapping("/profile")
    public ApiResponse<?> getProfile(Authentication authentication){

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserResponse response = new UserResponse(
                user.getEmail(),
                user.getRole()
        );

        return new ApiResponse<>(true, "Profile fetched successfully", response);
    }

    // ✅ UPDATE PROFILE
    @PutMapping("/update-profile")
    public ApiResponse<?> updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ){

        String email = authentication.getName();

        userService.updateProfile(email, request);

        return new ApiResponse<>(true, "Profile updated successfully", null);
    }

    // ✅ CHANGE PASSWORD
    @PutMapping("/change-password")
    public ApiResponse<?> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request
    ){

        String email = authentication.getName();

        userService.changePassword(email, request);

        return new ApiResponse<>(true, "Password changed successfully", null);
    }
}