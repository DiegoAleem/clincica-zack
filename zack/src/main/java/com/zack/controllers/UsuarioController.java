package com.zack.controllers;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.domain.model.Usuario;
import com.zack.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    @GetMapping
    public ResponseEntity<String> getUser(){
        return ResponseEntity.ok("sucesso!");
    }
    
    @PutMapping("/desativar/{id}/{usuarioLogin}")
    public ResponseEntity<String> desativarUsuario(@PathVariable String id, @PathVariable String usuarioLogin){
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()) {
            usuarioService.desativarUsuario(usuario.get(), usuarioLogin);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/ativar/{id}/{usuarioLogin}")
    public ResponseEntity<String> ativarUsuario(@PathVariable String id, @PathVariable String usuarioLogin){
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()) {
            usuarioService.ativarUsuario(usuario.get(), usuarioLogin);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
