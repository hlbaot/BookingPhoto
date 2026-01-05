package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOtpRepository extends JpaRepository<Otp, Integer> {
//    Otp findByOtpCode(String code);
    Otp findByEmailAndOtpCode(String email, String otpCode);
}