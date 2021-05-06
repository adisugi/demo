package com.example.demo.model.dto;

import lombok.Data;
//import java.util.Date;

@Data
public class UserDto {
    private Integer idUser;
    private String nama;
    private String telp;
    private String email;
}