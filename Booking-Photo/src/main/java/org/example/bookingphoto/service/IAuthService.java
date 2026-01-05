package org.example.bookingphoto.service;

import com.nimbusds.jose.JOSEException;
import org.example.bookingphoto.authentication.*;
import org.example.bookingphoto.model.User;

import java.text.ParseException;

public interface IAuthService {
    AuthenticationResponse authenticate (AuthenticationRequest authenticationRequest);

    RegisterResponse register(RegisterRequest registerRequest);

    String sendOtp(String email);

    String requestPasswordReset(String email);

    Boolean verifyOtp(String email, String code);

    String changePassword(RequestPasswordReset requestPasswordReset);
}
