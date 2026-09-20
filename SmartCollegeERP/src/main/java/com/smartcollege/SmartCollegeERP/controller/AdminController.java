package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create-admin")
    public ApiResponse<?> createAdmin(@RequestBody User user){

        adminService.createAdmin(user);

        return new ApiResponse<>(true, "Admin Created Successfully 🚀", null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ApiResponse<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "email") String sort
    ) {

        return new ApiResponse<>(
                true,
                "Users fetched successfully",
                adminService.getAllUsers(page, size, sort)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{email}")
    public ApiResponse<?> deleteUser(@PathVariable String email){

        adminService.deleteUser(email);

        return new ApiResponse<>(true, "User deleted successfully", null);
    }



    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats")
    public ApiResponse<?> getAdminStats(){

        return new ApiResponse<>(
                true,
                "Admin stats fetched successfully",
                adminService.getAdminStats()
        );
    }

    @GetMapping("/enrollments/{courseId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<?> getEnrollments(@PathVariable String courseId){

        return new ApiResponse<>(
                true,
                "Enrollments fetched successfully",
                adminService.getEnrollmentsByCourse(courseId)
        );
    }
}