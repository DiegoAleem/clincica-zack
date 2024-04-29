package com.zack.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zack.domain.model.Candidato;
import com.zack.dto.CriacaoPerfilDTO;

public interface CandidatoService {
    
    List<Candidato> findAll();
    
    Optional<Candidato> findById(String id);

    CriacaoPerfilDTO aprovarCandidato(Candidato candidato);

    Candidato arquivarCandidato(Candidato candidato);

    Boolean excluirCandidato(Candidato candidato);

    Page<Candidato> getCandidatos(String filtro, Pageable pageable);

}
