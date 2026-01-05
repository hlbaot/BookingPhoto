package org.example.bookingphoto.controller;

import org.example.bookingphoto.dto.FormBookingApproveDTO;
import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.example.bookingphoto.service.IFormBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formBookings")
public class FormBookingController {
    @Autowired
    private IFormBookingService formBookingService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FormBookingShowDTO>> showFormBookings () {
        List<FormBookingShowDTO> formBookingShowDTOList = formBookingService.showFormBookingsByUser();
        return new ResponseEntity<>(formBookingShowDTOList, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<FormBookingCreateDTO> create (@RequestParam("packageId") Integer packageId, @RequestBody FormBookingCreateDTO formBookingCreateDTO, Authentication authentication) {
        FormBookingCreateDTO save = formBookingService.create(packageId, formBookingCreateDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(save);
    }

    @PutMapping("/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormBookingApproveDTO> approveFormBooking (@RequestParam("formBookingId") Integer formBookingId, Authentication authentication) {
        FormBookingApproveDTO formBookingApproveDTO = formBookingService.approveFormBooking(formBookingId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(formBookingApproveDTO);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormBooking> deleteFormBooking (@RequestParam("formBookingId") Integer formBookingId, Authentication authentication) {
        formBookingService.delete(formBookingId, authentication);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
