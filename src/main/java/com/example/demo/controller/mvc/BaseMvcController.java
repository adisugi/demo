package com.example.demo.controller.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class BaseMvcController {

    @GetMapping("user")
    public String user() {
        return "tabel/index";
    }

    @GetMapping("transaksi")
    public String transaksi() {
        return "tabel/index2";
    }
}
