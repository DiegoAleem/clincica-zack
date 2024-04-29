package com.zack.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;

public interface PerfilService {
    
    
    Perfil criarPerfil(Candidato candidato, Usuario usuario);

    Page<Perfil> getPerfis(String filtro, Pageable pageable);

}
