package com.example.demo.service;

import com.example.demo.model.entity.User;
import com.example.demo.repository.TransaksiRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private TransaksiRepository detailRepository;

    @Override
    public User saveUserMaterDetail(User user) {

        userRepository.save(user);


        return user;
    }
}
