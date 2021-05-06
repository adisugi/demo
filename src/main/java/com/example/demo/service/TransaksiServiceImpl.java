package com.example.demo.service;

import com.example.demo.model.entity.Transaksi;
import com.example.demo.repository.TransaksiRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Transactional
@Service
public class TransaksiServiceImpl implements TransaksiService {
    @Autowired
    private TransaksiRepository transaksiRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Transaksi saveTransaksiMaterDetail(Transaksi transaksi) {
        transaksi = transaksiRepository.save(transaksi);
        transaksi.setUser(userRepository.findById(transaksi.getIdUser()).get());

        return transaksi;
    }


}
