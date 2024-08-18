package com.zack.service;

import java.util.Optional;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Usuario;

public interface UsuarioService {
    
    Usuario criarUsuario(Candidato candidato);
    
    Optional<Usuario> findById(String id);

    Usuario desativarUsuario(Usuario usuario, String usuarioLogin);

    Usuario ativarUsuario(Usuario usuario, String usuarioLogin);
}
