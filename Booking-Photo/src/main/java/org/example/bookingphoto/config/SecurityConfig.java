package org.example.bookingphoto.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    // Định nghĩa một bean của SecurityFilterChain để cấu hình bảo mật cho ứng dụng
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        // Cấu hình quyền truy cập cho các yêu cầu HTTP
        httpSecurity.authorizeHttpRequests(request -> {
            request
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Cho phép tất cả các yêu cầu OPTIONS
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/packages/**").permitAll() // 👈 cho phép public
                    .requestMatchers(HttpMethod.GET, "/ratings/**").permitAll() // 👈 cho phép public
                    .anyRequest().authenticated(); // nhưng request còn lại phải được xác thực
        });
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
        );
        // Vô hiệu hóa bảo mật CSRF (Cross-Site Request Forgery)
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        // Xây dựng và trả về đối tượng SecurityFilterChain
        return httpSecurity.build();
    }
    @Bean
    public JwtDecoder jwtDecoder() {
        // Tạo khóa bí mật với thuật toán HS512
        SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");

        // Cấu hình và tạo JwtDecoder với khóa bí mật và thuật toán mã hóa
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)  // Đặt khóa bí mật
                .macAlgorithm(MacAlgorithm.HS512)  // Chọn thuật toán HS512
                .build();  // Xây dựng JwtDecoder
    }
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        // Tạo JwtGrantedAuthoritiesConverter và đặt tiền tố quyền hạn
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        // Tạo JwtAuthenticationConverter và thiết lập JwtGrantedAuthoritiesConverter
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        // Trả về JwtAuthenticationConverter cấu hình sẵn
        return jwtAuthenticationConverter;
    }
}
