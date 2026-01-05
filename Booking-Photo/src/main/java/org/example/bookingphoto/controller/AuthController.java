package org.example.bookingphoto.controller;

import org.example.bookingphoto.authentication.*;
import org.example.bookingphoto.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;

    @PostMapping("/login")
    public AuthenticationResponse authenticate (@RequestBody AuthenticationRequest authenticationRequest) {
        return authService.authenticate(authenticationRequest);
    }
    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }
    // API yêu cầu thay đổi mật khẩu
    @PostMapping("/request-password-reset")
    public String requestPasswordReset(@RequestParam String email) {
        return authService.requestPasswordReset(email);
    }
    // API thay đổi mật khẩu
    @PostMapping("/change-password")
    public String changePassword(@RequestBody RequestPasswordReset requestPasswordReset) {
        return authService.changePassword(requestPasswordReset);
    }
    // gửi otp về email
    @PostMapping("/send-otp")
    public String getOtp(@RequestParam String email) {
        return authService.sendOtp(email);
    }
    @PostMapping("/verify-otp")
    public Boolean verifyOtp(@RequestParam String email, @RequestParam String code) {
        return authService.verifyOtp(email, code);
    }
}
