
package com.smartcollege.SmartCollegeERP.controller;

import com.smartcollege.SmartCollegeERP.dto.ApiResponse;
import com.smartcollege.SmartCollegeERP.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<?>> makePayment(
            @PathVariable String courseId,
            @RequestParam double amount,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "User is not authenticated", null));
        }

        try {
            boolean newlyEnrolled = paymentService.makePayment(
                    courseId,
                    authentication.getName(),
                    amount
            );

            if (!newlyEnrolled) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ApiResponse<>(false, "You are already enrolled in this course", null));
            }

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Payment successful & enrolled", null)
            );
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }
}