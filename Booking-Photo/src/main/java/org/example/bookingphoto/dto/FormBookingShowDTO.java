package org.example.bookingphoto.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormBookingShowDTO {
    private Integer formBookingId;
    private String location;
    private String email;
    private String message;
    private LocalDateTime bookTime;
    private Boolean status;
    private Integer packageId;
    private String packageName;
    private Integer pricePackage;
}
