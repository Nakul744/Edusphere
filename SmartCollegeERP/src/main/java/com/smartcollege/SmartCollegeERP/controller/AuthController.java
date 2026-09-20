package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.dto.LoginRequest;
import com.smartcollege.SmartCollegeERP.exception.EmailAlreadyExistsException;
import com.smartcollege.SmartCollegeERP.exception.InvalidCredentialsException;
import com.smartcollege.SmartCollegeERP.model.Role;
import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.repository.UserRepository;
import com.smartcollege.SmartCollegeERP.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody User user){

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.STUDENT);

        userRepository.save(user);

        return new ApiResponse<>(true, "User registered successfully", null);
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginRequest request){

        var optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            throw new InvalidCredentialsException("Invalid Email or Password");
        }

        User user = optionalUser.get();

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Invalid Email or Password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new ApiResponse<>(true, "Login successful", token);
    }
}