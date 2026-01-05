package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.exception.MessageError;
import org.example.bookingphoto.model.Rating;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IRatingService {

    Rating create(RatingCreateDTO ratingCreateDTO, Authentication authentication);

    Rating delete(Integer ratingId, Authentication authentication);
    List<RatingShowDTO> showRatings();
}
