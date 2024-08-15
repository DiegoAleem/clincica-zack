package com.zack.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.TipoAbordagem;
import com.zack.service.TipoAbordagemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tipo-abordagem")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TipoAbordagemController {
    
    private final TipoAbordagemService tipoAbordagemService;
    
    @GetMapping("/todos")
    public ResponseEntity<List<TipoAbordagem>> getAll() {
        return ResponseEntity.ok(tipoAbordagemService.getAll());
    }

}
