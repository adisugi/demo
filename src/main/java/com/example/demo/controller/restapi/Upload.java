package com.example.demo.controller.restapi;

import com.example.demo.model.dto.TransaksiDto;
// import com.example.demo.model.entity.Transaksi;
import com.example.demo.repository.TransaksiRepository;
import com.example.demo.service.TransaksiService;
import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/doc")
public class Upload {

    private TransaksiService transaksiService;
    private TransaksiRepository transaksiRepository;
    private ModelMapper modelMapper;


    public Upload(TransaksiService transaksiService, TransaksiRepository transaksiRepository, ModelMapper modelMapper) {
        this.transaksiService = transaksiService;
        this.transaksiRepository = transaksiRepository;
        this.modelMapper = modelMapper;
    }


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TransaksiDto uploadDocument(@RequestPart(value = "transaksi", required = true) TransaksiDto transaksiDto,
                                       @RequestPart(value = "file", required = true) MultipartFile file) throws Exception {

        String userFolderPath = "D:/";
        Path path = Paths.get(userFolderPath);
        Path filePath = path.resolve(file.getOriginalFilename());

//        Transaksi transaksi = new Transaksi();
//        String pat = filePath.toUri().getPath();
//        transaksi.setFile(pat);
//
//        modelMapper.map(transaksiDto, transaksi);
//        transaksiRepository.save(transaksi);


        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        System.out.println("Upload file with size" + file.getSize() + " with name :  " + file.getOriginalFilename());
        return null;
    }
}
