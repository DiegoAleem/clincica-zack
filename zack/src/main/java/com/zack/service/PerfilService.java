package com.zack.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.dto.PerfilDTO;
import com.zack.dto.PesquisaDTO;

public interface PerfilService {
    
    
    Perfil criarPerfil(Candidato candidato, Usuario usuario);

    Page<Perfil> getPerfis(String filtro, Pageable pageable);

    Perfil salvarPerfil(PerfilDTO perfil, String arquivoFoto);

    Perfil getPerfil(String id);

    Perfil getPerfilPorUsuario(Usuario usuario);

   List<Perfil> getTop3ProfilesWithHighestAverageRating();

   Page<Perfil> getPerfisFiltroMelhorAvaliados(PesquisaDTO pesquisa, Pageable pageable);

}
