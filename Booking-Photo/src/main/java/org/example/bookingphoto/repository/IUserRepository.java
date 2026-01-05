package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<User, Integer> {
    @Query(value = "select u.* from User as u where (:email = '' or :email is null or (u.email = :email))", nativeQuery = true)
    User showUsername(@Param("email") String email);
    User findByEmail(String email);
}