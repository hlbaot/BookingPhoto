package org.example.bookingphoto.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    // Phương thức tạo OTP ngẫu nhiên
    public String generateOTP() {
        SecureRandom random = new SecureRandom();
        int code = random.nextInt(999999); // Tạo OTP 6 chữ số
        return String.format("%06d", code); // Đảm bảo OTP có 6 chữ số
    }

    // Phương thức gửi OTP qua email
    public void sendOTPEmail(String to, String code) {
        // Tạo email đơn giản
        String subject = "Your OTP Code";
        String text = "Your OTP code is: " + code;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);  // Địa chỉ email người nhận
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("ahmobile17022005@gmail.com");  // Địa chỉ email gửi

        // Gửi email
        javaMailSender.send(message);
    }

}
