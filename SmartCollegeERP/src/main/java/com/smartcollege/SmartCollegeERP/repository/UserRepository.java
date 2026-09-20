package com.smartcollege.SmartCollegeERP.repository;

import com.smartcollege.SmartCollegeERP.model.User;
import com.smartcollege.SmartCollegeERP.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String > {

    Optional<User> findByEmail(String email);

    long countByRole(Role role);
}