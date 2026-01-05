package org.example.bookingphoto.repository;

import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.example.bookingphoto.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFormBookingRepository extends JpaRepository<FormBooking, Integer> {
    @Query(value = "SELECT new org.example.bookingphoto.dto.FormBookingShowDTO(fb.id, fb.location, u.email, fb.message, fb.bookTime, fb.status, p.id, p.name, p.price) from FormBooking as fb left join Package as p on fb.packageField.id = p.id left join User as u on fb.user.id = u.id")
    List<FormBookingShowDTO> showFormBookings();

    List<FormBooking> findByUser(User user);
}