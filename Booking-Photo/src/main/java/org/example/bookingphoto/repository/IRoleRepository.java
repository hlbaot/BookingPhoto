package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String name);
}