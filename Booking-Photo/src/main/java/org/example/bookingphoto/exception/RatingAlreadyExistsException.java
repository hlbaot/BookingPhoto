package org.example.bookingphoto.exception;

public class RatingAlreadyExistsException extends RuntimeException{
    public RatingAlreadyExistsException(String message) {
        super(message);
    }
}
