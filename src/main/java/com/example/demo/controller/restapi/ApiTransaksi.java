package com.example.demo.controller.restapi;

import com.example.demo.model.dto.TransaksiDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.Transaksi;
import com.example.demo.model.entity.User;
import com.example.demo.repository.TransaksiRepository;
import com.example.demo.service.TransaksiService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transaksi")
public class ApiTransaksi {
    @Autowired
    private TransaksiRepository transaksiRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TransaksiService transaksiService;

    @GetMapping
    public List<TransaksiDto> getListTransaksi() {
        List<Transaksi> transaksiList = transaksiRepository.findAll();
        List<TransaksiDto> transaksiDto =
                transaksiList.stream()
                        .map(transaksi -> mapTransaksiToTransaksiDto(transaksi))
                        .collect(Collectors.toList());
        return transaksiDto;
    }

    private TransaksiDto mapTransaksiToTransaksiDto(Transaksi transaksi) {
        TransaksiDto transaksiDto = modelMapper.map(transaksi, TransaksiDto.class);
        transaksiDto.setEmail(transaksi.getUser().getEmail());
        transaksiDto.setTelp(transaksi.getUser().getTelp());
        transaksiDto.setIdUser(transaksi.getUser().getIdUser());
        transaksiDto.setIdTransaksi(transaksi.getIdTransaksi());
        transaksiDto.setNama(transaksi.getUser().getNama());
        return transaksiDto;
    }

    @GetMapping("/{id}")
    public TransaksiDto getTransaksi(@PathVariable Integer id) {
        Transaksi transaksi = transaksiRepository.findById(id).get();
        TransaksiDto transaksiDto = new TransaksiDto();
        modelMapper.map(transaksi, transaksiDto);
        transaksiDto.setIdTransaksi(transaksi.getIdTransaksi());
        transaksiDto.setNama(transaksi.getUser().getNama());
        transaksiDto.setEmail(transaksi.getUser().getEmail());
        transaksiDto.setTelp(transaksi.getUser().getTelp());
        return transaksiDto;
    }

    @GetMapping("/getFoto/{idTransaksi}")
    public byte[] getFoto(@PathVariable Integer idTransaksi) throws IOException {
        Transaksi transaksi = transaksiRepository.findById(idTransaksi).get();
        String userFolderPath = "D:/img/";
        String pathFile = userFolderPath + transaksi.getFile();
        Path paths = Paths.get(pathFile);
        byte[] foto = Files.readAllBytes(paths);
        return foto;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TransaksiDto editSave(@RequestPart(value = "transaksi", required = true) TransaksiDto transaksiDto,
                                 @RequestPart(value = "file", required = true) MultipartFile file) throws Exception {

        String userFolderPath = "D:/img";
//                System.getProperty("user.dir").replace('\\', '/') +"/demo/src/main/resources/static/img";
        Path path = Paths.get(userFolderPath);
        Path filePath = path.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Upload file with size" + file.getSize() + " with name :  " + file.getOriginalFilename());

        Transaksi transaksi = modelMapper.map(transaksiDto, Transaksi.class);
//        String pat = filePath.toUri().getPath();    //mengambil path dalam bentuk string
        transaksi.setFile(file.getOriginalFilename());

        transaksi = transaksiService.saveTransaksiMaterDetail(transaksi);
        TransaksiDto transaksiDtoDB = mapTransaksiToTransaksiDto(transaksi);
        return transaksiDtoDB;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        transaksiRepository.deleteById(id);
    }

    @DeleteMapping
    @ResponseBody
    public void deleteTable() {
        transaksiRepository.deleteAll();
    }

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "createdon", nullable = false)

//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    private Date tanggalLahir;
}