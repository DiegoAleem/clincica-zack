package com.zack.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.Perfil;
import com.zack.service.PerfilService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/perfil")
@RequiredArgsConstructor
public class PerfilController {
    
    private final PerfilService perfilService;    
    
    @GetMapping("/filtrados")
    public ResponseEntity<Page<Perfil>> getAll(
            @RequestParam(defaultValue = "") String filtro,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanhoPagina,
            @RequestParam(required = false, defaultValue = "nome") String campoOrdenado,
            @RequestParam(required = false, defaultValue = "ASC") String ordem) {
        Pageable pageable; 
        if(ordem.equals("ASC")) {
            pageable = PageRequest.of(pagina-1, tamanhoPagina, Sort.by(Sort.Direction.ASC, campoOrdenado));
        } else {
            pageable = PageRequest.of(pagina-1, tamanhoPagina, Sort.by(Sort.Direction.DESC, campoOrdenado));
        }
        return ResponseEntity.ok(perfilService.getPerfis(filtro, pageable));
    }

}
