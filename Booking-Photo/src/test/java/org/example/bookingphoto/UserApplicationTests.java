package org.example.bookingphoto;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@SpringBootTest
public class UserApplicationTests {
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    // Phương thức generateToken tạo ra một JWT token với thông tin người dùng
    private String generateToken(String username) {
        // Tạo phần header cho JWT, sử dụng thuật toán ký là HS512 (HMAC SHA-512)
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // Tạo phần claims (payload) cho JWT, chứa các thông tin về người dùng
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username) // Đặt chủ thể (subject) của JWT là tên đăng nhập của người dùng
                .issuer("vhh.com") // Đặt người phát hành JWT là "sqc.com"
                .issueTime(new Date()) // Đặt thời gian phát hành JWT là thời điểm hiện tại
                .expirationTime(new Date( // Đặt thời gian hết hạn cho JWT là 1 giờ kể từ lúc phát hành
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                // Thêm một custom claim (thông tin tùy chỉnh) vào JWT, chứa thông tin về đối tượng Student
                .claim("user", "thong tin user")
                .build(); // Xây dựng đối tượng JWTClaimsSet

        // Tạo payload từ claims đã tạo, chuyển đối tượng claims thành định dạng JSON
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // Tạo JWSObject từ header và payload, kết hợp chúng lại thành đối tượng JWS
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            // Ký JWT bằng thuật toán HMAC SHA-512, sử dụng khóa bí mật (SIGNER_KEY)
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));

            // Chuyển đối tượng JWS thành chuỗi JWT hoàn chỉnh (header.payload.signature) và trả về
            return jwsObject.serialize();
        } catch (JOSEException e) {
            // Nếu có lỗi xảy ra trong quá trình ký JWT, ném ra ngoại lệ RuntimeException
            throw new RuntimeException(e);
        }
    }

    // Phương thức verifyJWT kiểm tra tính hợp lệ của JWT token và xác thực nó
    public boolean verifyJWT(String token)
            throws JOSEException, ParseException {
        // Tạo một đối tượng JWSVerifier với thuật toán HMAC SHA-512 để xác minh chữ ký của JWT
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        // Phân tích cú pháp (parse) chuỗi JWT thành đối tượng SignedJWT
        SignedJWT signedJWT = SignedJWT.parse(token);

        // Lấy thời gian hết hạn của JWT từ phần claims (payload)
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        // Xác minh chữ ký của JWT, kiểm tra xem chữ ký có hợp lệ không
        var verified = signedJWT.verify(verifier);

        // Trả về kết quả xác thực:

        return verified && expiryTime.after(new Date());
    }
}
