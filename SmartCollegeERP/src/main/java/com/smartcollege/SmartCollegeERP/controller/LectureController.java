package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.model.Lecture;
import com.smartcollege.SmartCollegeERP.service.LectureService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;

    // Admin add lecture
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<?> createLecture(@RequestBody Lecture lecture){

        return new ApiResponse<>(
                true,
                "Lecture created successfully",
                lectureService.createLecture(lecture)
        );
    }

    // Get course lectures
    @GetMapping("/{courseId}")
    public ApiResponse<?> getLectures(@PathVariable String courseId){

        return new ApiResponse<>(
                true,
                "Lectures fetched successfully",
                lectureService.getLecturesByCourse(courseId)
        );
    }

    // Delete lecture
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{lectureId}")
    public ApiResponse<?> deleteLecture(@PathVariable String lectureId){

        lectureService.deleteLecture(lectureId);

        return new ApiResponse<>(true,"Lecture deleted",null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{lectureId}")
    public ApiResponse<?> updateLecture(
            @PathVariable String lectureId,
            @RequestBody Lecture lecture
    ){

        return new ApiResponse<>(
                true,
                "Lecture updated successfully",
                lectureService.updateLecture(lectureId, lecture)
        );
    }
}