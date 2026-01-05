package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.FormBookingApproveDTO;
import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IFormBookingService {
    FormBookingCreateDTO create (Integer packageId, FormBookingCreateDTO formBookingCreateDTO, Authentication authentication);

    List<FormBookingShowDTO> showFormBookingsByUser();

    FormBookingApproveDTO approveFormBooking(Integer formBookingId, Authentication authentication);

    void delete(Integer formBookingId, Authentication authentication);
}
