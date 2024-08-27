package com.zack.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://www.clinicazack.com.br")
public class ApiController {

    @GetMapping("/endpoint")
    public String getEndpoint() {
        return "Resposta do endpoint";
    }
}
