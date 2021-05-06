package com.example.demo.controller.restapi;

import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class ApiUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @GetMapping()
    public List<UserDto> getListUser() {
        List<User> userList = userRepository.findAll();
        List<UserDto> userDtos =
                userList.stream()
                        .map(user -> mapUserToUserDto(user))
                        .collect(Collectors.toList());
        return userDtos;
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Integer id) {
        User user = userRepository.findById(id).get();
        UserDto userDto = new UserDto();
        modelMapper.map(user, userDto);
        userDto.setIdUser(user.getIdUser());
        return userDto;
    }

    @PostMapping
    public UserDto editSaveUser(@RequestBody UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        userService.saveUserMaterDetail(user);
        UserDto userDtoDB = mapUserToUserDto(user);
        return userDtoDB;
    }

    private UserDto mapUserToUserDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        userDto.setIdUser(user.getIdUser());
        return userDto;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        userRepository.deleteById(Integer.parseInt(id));
    }

    @DeleteMapping
    @ResponseBody
    public void deleteTable() {
        userRepository.deleteAll();
    }

}
