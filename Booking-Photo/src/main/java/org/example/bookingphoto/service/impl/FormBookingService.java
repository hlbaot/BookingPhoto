package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.FormBookingApproveDTO;
import org.example.bookingphoto.dto.FormBookingCreateDTO;
import org.example.bookingphoto.dto.FormBookingShowDTO;
import org.example.bookingphoto.model.FormBooking;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.model.User;
import org.example.bookingphoto.repository.IFormBookingRepository;
import org.example.bookingphoto.repository.IPackageRepository;
import org.example.bookingphoto.repository.IUserRepository;
import org.example.bookingphoto.service.IFormBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class FormBookingService implements IFormBookingService {
    @Autowired
    private IFormBookingRepository formBookingRepository;
    @Autowired
    private IPackageRepository packageRepository;
    @Autowired
    private IUserRepository userRepository;

    @Override
    public FormBookingCreateDTO create(Integer packageId, FormBookingCreateDTO formBookingCreateDTO, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email " + authentication.getName());
        }
        Package aPackage = packageRepository.findById(packageId).orElse(null);
        if (aPackage == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + packageId);
        }
        FormBooking formBooking = new FormBooking();
        formBooking.setUser(user);
        formBooking.setPackageField(aPackage);
        formBooking.setLocation(formBookingCreateDTO.getLocation());
        formBooking.setBookTime(formBookingCreateDTO.getBookTime());
        formBooking.setStatus(false);
        formBooking.setMessage(formBookingCreateDTO.getMessage());
        FormBooking saved = formBookingRepository.save(formBooking);
        return new FormBookingCreateDTO(
                saved.getLocation(),
                saved.getBookTime(),
                saved.getMessage()
        );
    }

    @Override
    public List<FormBookingShowDTO> showFormBookingsByUser() {
            return formBookingRepository.showFormBookings();
    }

    @Override
    public FormBookingApproveDTO approveFormBooking(Integer formBookingId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email " + authentication.getName());
        }
        FormBooking formBooking = formBookingRepository.findById(formBookingId).orElse(null);
        if (formBooking == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "FormBooking not found with id " + formBookingId);
        }
        formBooking.setStatus(true);
        FormBooking approveFormBooking = formBookingRepository.save(formBooking);
        return convertToDto(approveFormBooking);
    }
    private FormBookingApproveDTO convertToDto(FormBooking formBooking) {
        FormBookingApproveDTO dto = new FormBookingApproveDTO();
        dto.setStatus(formBooking.getStatus());
        return dto;
    }
    @Override
    public void delete(Integer formBookingId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email " + authentication.getName());
        }
        Optional<FormBooking> optionalFormBooking = formBookingRepository.findById(formBookingId);
        if (optionalFormBooking.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + formBookingId);
        }
        FormBooking formBooking = optionalFormBooking.get();
        formBookingRepository.delete(formBooking);
    }
}
