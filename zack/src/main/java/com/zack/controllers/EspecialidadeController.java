package com.zack.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.Especialidade;
import com.zack.service.EspecialidadeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/especialidade")
@RequiredArgsConstructor
public class EspecialidadeController {
    
    private final EspecialidadeService especialidadeService;
    
    @GetMapping("/todos")
    public ResponseEntity<List<Especialidade>> getAll() {
        return ResponseEntity.ok(especialidadeService.getAll());
    }

}
