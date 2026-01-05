package org.example.bookingphoto.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RatingShowDTO {
    private Integer id;
    private Integer ratingIndex;
    private String content;
    private LocalDateTime createAt;
    private String email;
}
