package com.zack.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zack.domain.model.Candidato;

public interface CandidatoService {
    
    List<Candidato> findAll();
    
    Optional<Candidato> findById(String id);

    Candidato aprovarCandidato(Candidato candidato);

    Candidato arquivarCandidato(Candidato candidato);

    Boolean excluirCandidato(Candidato candidato);

    Page<Candidato> getCandidatos(String filtro, String campoOrdenado, String ordem, Pageable pageable);

}
