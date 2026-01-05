package org.example.bookingphoto.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.bookingphoto.model.Image;
import org.example.bookingphoto.model.Package;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormBookingCreateDTO {
    private String location;
    private LocalDateTime bookTime;
    private String message;
}
