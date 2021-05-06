package com.example.demo.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = User.TABLE_NAME)
@Data
public class User {
    public static final String TABLE_NAME = "t_user";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "t_user")
    @SequenceGenerator(name="t_user" , sequenceName = "t_user_seq")
    private Integer idUser;
    @Column(nullable = false)
    private String nama;
    @Column(nullable = false)
    private String telp;
    @Column(nullable = false)
    private String email;
//
//    @OneToMany
//    @JoinColumn(name = "id_transaksi", nullable = false)
//    private Transaksi transaksi;

}
