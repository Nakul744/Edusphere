package com.smartcollege.SmartCollegeERP.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.model.Course;
import com.smartcollege.SmartCollegeERP.service.CourseService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final Cloudinary cloudinary;

    // ✅ ADMIN: Create Course with Image Upload (Cloudinary)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = "multipart/form-data")
    public ApiResponse<?> createCourse(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam MultipartFile image,
            Authentication authentication
    ) throws IOException {

        // Upload image to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                ObjectUtils.emptyMap()
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        // Create course object
        Course course = Course.builder()
                .title(title)
                .description(description)
                .price(price)
                .createdBy(authentication.getName())
                .photoUrl(imageUrl)
                .build();

        return new ApiResponse<>(
                true,
                "Course created successfully",
                courseService.createCourse(course, authentication.getName())
        );
    }

    // ✅ PUBLIC: View All Courses
    @GetMapping
    public ApiResponse<?> getAllCourses(){
        return new ApiResponse<>(
                true,
                "Courses fetched successfully",
                courseService.getAllCourses()
        );
    }

    // ✅ ADMIN: Delete Course
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteCourse(@PathVariable String id){

        courseService.deleteCourse(id);

        return new ApiResponse<>(true, "Course deleted successfully", null);
    }

    // ✅ STUDENT: Enroll in Course
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/enroll/{courseId}")
    public ApiResponse<?> enrollCourse(
            @PathVariable String courseId,
            Authentication authentication
    ){
        try{
            courseService.enroll(courseId, authentication.getName());

            return new ApiResponse<>(true, "Enrolled successfully", null);

        }catch (Exception ignored){
            return new ApiResponse<>(false,"You already Enrolled in this Course", null);
        }
    }

    // ✅ STUDENT: View My Courses
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my")
    public ApiResponse<?> myCourses(Authentication authentication){

        return new ApiResponse<>(
                true,
                "My courses fetched successfully",
                courseService.getMyCourses(authentication.getName())
        );
    }
}