package com.zack.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.dto.PerfilDTO;

public interface PerfilService {
    
    
    Perfil criarPerfil(Candidato candidato, Usuario usuario);

    Page<Perfil> getPerfis(String filtro, Pageable pageable);

    Perfil salvarPerfil(PerfilDTO perfil, String arquivoFoto);

    Perfil getPerfil(String id);

    Perfil getPerfilPorUsuario(Usuario usuario);

}
