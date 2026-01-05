package org.example.bookingphoto.authentication;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private String email;
    private Collection<? extends GrantedAuthority> roleList;
    private String token;
}
