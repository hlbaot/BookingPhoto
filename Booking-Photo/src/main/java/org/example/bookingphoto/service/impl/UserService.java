package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.model.User;
import org.example.bookingphoto.repository.IUserRepository;
import org.example.bookingphoto.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Override
    public User showUsername(String username) {
        return userRepository.showUsername(username);
    }
}
