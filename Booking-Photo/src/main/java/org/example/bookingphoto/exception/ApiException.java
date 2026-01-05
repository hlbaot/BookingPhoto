package org.example.bookingphoto.exception;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException{
    ErrorCode errorCode;

    public ApiException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
