package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.dto.AdminStatsResponse;
import com.smartcollege.SmartCollegeERP.dto.UserResponse;
import com.smartcollege.SmartCollegeERP.exception.EmailAlreadyExistsException;
import com.smartcollege.SmartCollegeERP.exception.UserNotFoundException;
import com.smartcollege.SmartCollegeERP.model.Enrollment;
import com.smartcollege.SmartCollegeERP.model.Payment;
import com.smartcollege.SmartCollegeERP.model.Role;
import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.repository.AttendanceRepository;
import com.smartcollege.SmartCollegeERP.repository.EnrollmentRepository;
import com.smartcollege.SmartCollegeERP.repository.PaymentRepository;
import com.smartcollege.SmartCollegeERP.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PaymentRepository paymentRepository;   // ✅ NEW
    private final PasswordEncoder passwordEncoder;
    private final AttendanceRepository attendanceRepository;

    // ✅ Create Admin
    public void createAdmin(User user){

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("Admin email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);

        userRepository.save(user);
    }

    // ✅ Get All Users
    public Page<UserResponse> getAllUsers(int page, int size, String sort){

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));

        Page<User> usersPage = userRepository.findAll(pageable);

        return usersPage.map(user ->
                new UserResponse(
                        user.getEmail(),
                        user.getRole()
                )
        );
    }


    public void deleteUser(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // delete enrollments
        enrollmentRepository.deleteByStudentEmail(email);

        // delete attendance
        attendanceRepository.deleteByStudentEmail(email);

        // delete user
        userRepository.delete(user);
    }
    // ✅ Admin Stats (UPDATED)
    public AdminStatsResponse getAdminStats(){

        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole(Role.STUDENT);
        long totalEnrollments = enrollmentRepository.count();

        // 🔥 Calculate total revenue
        double totalRevenue = paymentRepository.findAll()
                .stream()
                .mapToDouble(Payment::getAmount)
                .sum();

        return new AdminStatsResponse(
                totalUsers,
                totalStudents,
                totalEnrollments,
                totalRevenue
        );
    }


    public List<Enrollment> getEnrollmentsByCourse(String courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
}