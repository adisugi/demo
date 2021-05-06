package com.example.demo.model.dto;

import lombok.Data;

@Data
public class TransaksiDto {
    private Integer idTransaksi;
    private Integer idUser;
    private String nama;
    private String telp;
    private String email;
    private String alamat;
    private String file;
}
