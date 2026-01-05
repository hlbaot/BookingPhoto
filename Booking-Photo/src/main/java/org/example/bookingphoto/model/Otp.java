package org.example.bookingphoto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "otps")
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // ID của OTP, có thể là auto-generated nếu cần
    private String email; // Email của người dùng nhận OTP
    private String otpCode;
    private LocalDateTime expiresAt; // Thời gian hết hạn của OTP (tính bằng milliseconds)
}