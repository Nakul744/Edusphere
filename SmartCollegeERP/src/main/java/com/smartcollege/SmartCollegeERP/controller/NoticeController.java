package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.model.Notice;
import com.smartcollege.SmartCollegeERP.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // Admin create notice
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<?> createNotice(
            @RequestBody Notice notice,
            Authentication authentication
    ){

        return new ApiResponse<>(
                true,
                "Notice created",
                noticeService.createNotice(notice, authentication.getName())
        );
    }

    // Students view notices
    @GetMapping
    public ApiResponse<?> getAllNotices(){

        return new ApiResponse<>(
                true,
                "Notices fetched",
                noticeService.getAllNotices()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteNotice(@PathVariable String id){

        noticeService.deleteNotice(id);

        return new ApiResponse<>(
                true,
                "Notice deleted successfully",
                null
        );
    }

}