package org.example.bookingphoto.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNAUTHENTICATION (401, "username or password is incorrect!", HttpStatus.UNAUTHORIZED);
    Integer code;
    String message;
    HttpStatus status;
}
