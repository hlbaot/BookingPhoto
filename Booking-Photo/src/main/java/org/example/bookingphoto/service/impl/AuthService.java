package org.example.bookingphoto.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import org.example.bookingphoto.authentication.*;
import org.example.bookingphoto.exception.ApiException;
import org.example.bookingphoto.exception.ErrorCode;
import org.example.bookingphoto.exception.MessageError;
import org.example.bookingphoto.model.Otp;
import org.example.bookingphoto.model.Role;
import org.example.bookingphoto.model.User;
import org.example.bookingphoto.repository.IOtpRepository;
import org.example.bookingphoto.repository.IRoleRepository;
import org.example.bookingphoto.repository.IUserRepository;
import org.example.bookingphoto.security.UserDetailService;
import org.example.bookingphoto.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService implements IAuthService {
    private String SIGNER_KEY = "xJTUVPssT2uOmsKKn7dmwi/ZuUg1b8ECkPuoSBYziE4ldzMBtSNkaftz1U372J/e";
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private IOtpRepository otpRepository;
    @Autowired
    private IRoleRepository roleRepository;
    @Autowired
    private EmailService emailService;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        if (userRepository.count() == 0) {
            throw new ApiException(ErrorCode.UNAUTHENTICATION);
        }
        User user = userRepository.findByEmail(authenticationRequest.getEmail());
        UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getEmail());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (user == null || !passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            throw new ApiException(ErrorCode.UNAUTHENTICATION);
        }
        return AuthenticationResponse.builder()
                .email(userDetails.getUsername())  // Sử dụng thông tin từ UserDetails
                .roleList(userDetails.getAuthorities())
                .token(generateToken(user))    // Tạo token cho UserDetails
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        List<String> roles = user.getRoleSet()
                .stream()
                .map(Role::getName) // ví dụ role.getName() trả về "ADMIN"
                .collect(Collectors.toList());


        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("vhh.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(7, ChronoUnit.DAYS).toEpochMilli()))
                .claim("roles", roles) // <== thêm claim "roles"
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        // Kiểm tra xem email hoặc username đã tồn tại chưa
        if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            // Ném ngoại lệ nếu email đã tồn tại
            throw new MessageError("Email is already in use");
        }
        Otp otp = otpRepository.findByEmailAndOtpCode(registerRequest.getEmail(), registerRequest.getOtp());
        if (Objects.equals(otp.getEmail(), registerRequest.getEmail()) && Objects.equals(otp.getOtpCode(), registerRequest.getOtp())) {
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            // Mã hóa mật khẩu
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName("USER");
            roles.add(userRole);
            user.setRoleSet(roles);
            userRepository.save(user);
        } else {
            throw new MessageError("Invalid OTP");
        }
        // Lưu người dùng vào cơ sở dữ liệu
        return RegisterResponse.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .build();
    }

    public String sendOtp(String email) {
        // Sinh mã OTP
        String code = emailService.generateOTP();
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setOtpCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);
        // Gửi mail
        emailService.sendOTPEmail(email, code);

        return code;
    }

    public String requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return "Email not found!";
        }
        // Tạo OTP và gửi qua email
        String code = emailService.generateOTP();
        emailService.sendOTPEmail(email, code);
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setOtpCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);
        // Lưu OTP vào cơ sở dữ liệu (hoặc cache)
        return "OTP sent to your email. Please verify to reset your password.";
    }

    @Override
    public Boolean verifyOtp(String email, String code) {
        // Kiểm tra OTP
        Otp otp = otpRepository.findByEmailAndOtpCode(email, code);
        if (Objects.equals(otp.getEmail(), email) && Objects.equals(otp.getOtpCode(), code)) {
            return false; // OTP không hợp lệ hoặc đã hết hạn
        }
        return true; // OTP hợp lệ
    }
    public String changePassword(RequestPasswordReset requestPasswordReset) {
        // Kiểm tra người dùng có tồn tại và OTP đã được xác thực không
        User user = userRepository.findByEmail(requestPasswordReset.getEmail());
        user.setPassword(passwordEncoder.encode(requestPasswordReset.getPassword()));
        userRepository.save(user);
        return "Password changed successfully!";
    }
}
