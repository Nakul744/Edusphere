package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.dto.DashboardResponse;
import com.smartcollege.SmartCollegeERP.model.*;
import com.smartcollege.SmartCollegeERP.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    private final AttendanceRepository attendanceRepository;

    public DashboardResponse getDashboardData(){

        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole(Role.STUDENT);
        long totalAdmins = userRepository.countByRole(Role.ADMIN);

        long totalCourses = courseRepository.count();
        long totalEnrollments = enrollmentRepository.count();

        // Revenue



        // Attendance
        List<Attendance> attendanceList = attendanceRepository.findAll();

        double avgAttendance = 0;

        if(!attendanceList.isEmpty()){
            long presentCount = attendanceList.stream()
                    .filter(Attendance::isPresent)
                    .count();

            avgAttendance =
                    (presentCount * 100.0) / attendanceList.size();
        }

        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalStudents(totalStudents)
                .totalAdmins(totalAdmins)
                .totalCourses(totalCourses)
                .totalEnrollments(totalEnrollments)
                .avgAttendance(avgAttendance)
                .build();
    }
}