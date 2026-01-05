package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}