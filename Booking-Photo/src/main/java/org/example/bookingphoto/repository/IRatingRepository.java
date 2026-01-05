package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IRatingRepository extends JpaRepository<Rating, Integer> {
    @Query(value = "SELECT new org.example.bookingphoto.dto.RatingShowDTO(r.id, r.ratingIndex, r.content, r.createAt, u.email) from Rating as r join r.user as u")
    List<RatingShowDTO> showRatings();
}