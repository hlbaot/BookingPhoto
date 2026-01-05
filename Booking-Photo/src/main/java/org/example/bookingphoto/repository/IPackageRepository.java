package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface IPackageRepository extends JpaRepository<Package, Integer> {
    @NonNull
    List<Package> findAll();
}