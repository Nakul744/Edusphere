package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.service.PaymentService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{courseId}")
    public ApiResponse<?> makePayment(
            @PathVariable String courseId,
            @RequestParam double amount,
            Authentication authentication
    ){

        String studentEmail = authentication.getName();

        paymentService.makePayment(courseId, studentEmail, amount);

        return new ApiResponse<>(true, "Payment successful & enrolled", null);
    }
}