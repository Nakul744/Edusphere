package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.AssignmentSubmission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssignmentSubmissionRepository extends MongoRepository<AssignmentSubmission,String> {

    List<AssignmentSubmission> findByAssignmentId(String assignmentId);

    boolean existsByAssignmentIdAndStudentEmail(String assignmentId,String studentEmail);


}