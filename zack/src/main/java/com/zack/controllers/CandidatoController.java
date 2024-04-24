package com.zack.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.Candidato;
import com.zack.dto.RespostaCandidatoDTO;
import com.zack.repositories.CandidatoRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/candidato")
@RequiredArgsConstructor
public class CandidatoController {
    
    private final CandidatoRepository candidatoRepository;
    
    @GetMapping("/todos")
    public ResponseEntity<List<Candidato>> getAll(){
        List<Candidato> candidatos = candidatoRepository.findAll();
        return ResponseEntity.ok(candidatos);
    }
    
}
