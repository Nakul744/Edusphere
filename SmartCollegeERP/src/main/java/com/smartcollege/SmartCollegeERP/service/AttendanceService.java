
package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.dto.AttendanceDashboardResponse;
import com.smartcollege.SmartCollegeERP.model.Attendance;
import com.smartcollege.SmartCollegeERP.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    // Mark or update today's attendance
    public Attendance markAttendance(String courseId, String studentEmail, boolean present) {
        if (courseId == null || courseId.isBlank() || studentEmail == null || studentEmail.isBlank()) {
            throw new IllegalArgumentException("courseId and studentEmail are required");
        }

        String normalizedCourseId = courseId.trim();
        String normalizedEmail = studentEmail.trim().toLowerCase();
        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository
                .findByCourseIdAndStudentEmailAndDate(normalizedCourseId, normalizedEmail, today)
                .map(existing -> {
                    existing.setPresent(present);
                    return existing;
                })
                .orElseGet(() -> Attendance.builder()
                        .courseId(normalizedCourseId)
                        .studentEmail(normalizedEmail)
                        .date(today)
                        .present(present)
                        .build());

        return attendanceRepository.save(attendance);
    }

    // Get Student Attendance
    public List<Attendance> getStudentAttendance(String email) {
        return attendanceRepository.findByStudentEmail(email.trim().toLowerCase());
    }

    // Calculate Attendance Percentage
    public double calculateAttendancePercentage(String courseId, String email) {
        List<Attendance> records = attendanceRepository.findByCourseIdAndStudentEmail(
                courseId.trim(),
                email.trim().toLowerCase()
        );

        if (records.isEmpty()) {
            return 0.0;
        }

        long presentCount = records.stream()
                .filter(Attendance::isPresent)
                .count();

        return (presentCount * 100.0) / records.size();
    }

    // Admin Attendance Dashboard
    public AttendanceDashboardResponse getAttendanceDashboard() {
        List<Attendance> records = attendanceRepository.findAll();

        long totalRecords = records.size();
        long totalPresent = records.stream()
                .filter(Attendance::isPresent)
                .count();
        long totalAbsent = totalRecords - totalPresent;

        double overallPercentage = totalRecords > 0
                ? (totalPresent * 100.0) / totalRecords
                : 0.0;

        return AttendanceDashboardResponse.builder()
                .totalRecords(totalRecords)
                .totalPresent(totalPresent)
                .totalAbsent(totalAbsent)
                .overallPercentage(overallPercentage)
                .build();
    }
}