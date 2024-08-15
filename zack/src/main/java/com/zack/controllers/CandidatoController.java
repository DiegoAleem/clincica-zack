package com.zack.controllers;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.Candidato;
import com.zack.service.CandidatoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/candidato")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CandidatoController {

    private final CandidatoService candidatoService;

    @GetMapping("/filtrados")
    public ResponseEntity<Page<Candidato>> getAll(
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
        return ResponseEntity.ok(candidatoService.getCandidatos(filtro, pageable));
    }

    @PutMapping("/editar/{id}/{status}")
    public ResponseEntity<Optional<Candidato>> arquivar(@PathVariable String id, @PathVariable String status) {
        Optional<Candidato> candidato = candidatoService.findById(id);
        if (!candidato.isEmpty()) {
            if (status.equals("aprovar")) {
                candidatoService.aprovarCandidato(candidato.get());
            } else {
                candidatoService.arquivarCandidato(candidato.get());
            }
            return ResponseEntity.ok(candidato);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Boolean> excluirCandidato(@PathVariable String id) {
        Optional<Candidato> candidato = candidatoService.findById(id);
        if (!candidato.isEmpty()) {
            return ResponseEntity.ok( candidatoService.excluirCandidato(candidato.get()));
        }

        return ResponseEntity.badRequest().build();

    }
}
