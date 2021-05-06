package com.example.demo.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = Transaksi.TABLENAME)
public class Transaksi {
    public static final String TABLENAME = "t_transaksi";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "t_transaksi")
    @SequenceGenerator(name="t_transaksi" , sequenceName = "t_transaksi_seq")
    private Integer idTransaksi;

    @ManyToOne
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;

    @Column(name = "id_user", nullable = false)
    private Integer idUser;

    @Column(name = "alamat")
    private String alamat;

    @Column(name = "url")
    private String file;
}
