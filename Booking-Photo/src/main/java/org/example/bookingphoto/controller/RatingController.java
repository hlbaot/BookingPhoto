package org.example.bookingphoto.controller;

import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.model.Rating;
import org.example.bookingphoto.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    @Autowired
    private IRatingService ratingService;

    @GetMapping("")
    public ResponseEntity<List<RatingShowDTO>> showRatings () {
        List<RatingShowDTO> ratingShowDTOList = ratingService.showRatings();
        return new ResponseEntity<>(ratingShowDTOList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRating(@RequestBody RatingCreateDTO ratingCreateDTO, Authentication authentication) {
        ratingService.create(ratingCreateDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(ratingCreateDTO);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rating> delete (@RequestParam("ratingId") Integer ratingId, Authentication authentication) {
        ratingService.delete(ratingId, authentication);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
