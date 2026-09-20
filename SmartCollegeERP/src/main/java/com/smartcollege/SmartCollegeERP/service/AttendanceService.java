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

    // ✅ Mark Attendance
    public Attendance markAttendance(String courseId, String studentEmail, boolean present){

        LocalDate today = LocalDate.now();

        boolean alreadyMarked =
                attendanceRepository.existsByCourseIdAndStudentEmailAndDate(
                        courseId,
                        studentEmail,
                        today
                );

        if(alreadyMarked){
            throw new RuntimeException("Attendance already marked for today");
        }

        Attendance attendance = Attendance.builder()
                .courseId(courseId)
                .studentEmail(studentEmail)
                .date(today)
                .present(present)
                .build();

        return attendanceRepository.save(attendance);
    }

    // ✅ Get Student Attendance
    public List<Attendance> getStudentAttendance(String email){
        return attendanceRepository.findByStudentEmail(email);
    }

    // ✅ Calculate Attendance Percentage
    public double calculateAttendancePercentage(String courseId, String email){

        List<Attendance> records =
                attendanceRepository.findByCourseIdAndStudentEmail(courseId, email);

        if(records.isEmpty()) return 0;

        long presentCount = records.stream()
                .filter(Attendance::isPresent)
                .count();

        return (presentCount * 100.0) / records.size();
    }

    // ✅ Admin Attendance Dashboard
    public AttendanceDashboardResponse getAttendanceDashboard() {

        List<Attendance> records = attendanceRepository.findAll();

        long totalRecords = records.size();

        long totalPresent = records.stream()
                .filter(Attendance::isPresent)
                .count();

        long totalAbsent = totalRecords - totalPresent;

        double overallPercentage = 0;

        if (totalRecords > 0) {
            overallPercentage = (totalPresent * 100.0) / totalRecords;
        }

        return AttendanceDashboardResponse.builder()
                .totalRecords(totalRecords)
                .totalPresent(totalPresent)
                .totalAbsent(totalAbsent)
                .overallPercentage(overallPercentage)
                .build();
    }
}