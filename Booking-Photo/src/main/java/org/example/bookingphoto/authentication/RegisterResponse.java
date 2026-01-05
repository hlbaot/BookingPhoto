package org.example.bookingphoto.authentication;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponse {
    private String email;
    private String username;
    private String password;
}
