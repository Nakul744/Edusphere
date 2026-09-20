package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.dto.ChangePasswordRequest;
import com.smartcollege.SmartCollegeERP.dto.UpdateProfileRequest;
import com.smartcollege.SmartCollegeERP.exception.UserNotFoundException;
import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Update Profile
    public void updateProfile(String email, UpdateProfileRequest request){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        userRepository.save(user);
    }

    // ✅ Change Password
    public void changePassword(String email, ChangePasswordRequest request){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Check old password
        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            throw new RuntimeException("Old password is incorrect");
        }

        // Set new encrypted password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
}