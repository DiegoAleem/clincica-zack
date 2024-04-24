package com.zack.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.repositories.CandidatoRepository;
import com.zack.service.ArquivoService;
import com.zack.service.CandidatoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CandidatoServiceImpl implements CandidatoService {
    
    private final CandidatoRepository candidatoRepository;
    private final ArquivoService arquivoService;
    
    @Override
    public List<Candidato> findAll() {
        return candidatoRepository.findAll();
    }

    @Override
    public Optional<Candidato> findById(String id) {
        return candidatoRepository.findById(id);
    }

    @Override
    public Candidato aprovarCandidato(Candidato candidato) {
        candidato.setStatus("APROVADO");
        return candidatoRepository.save(candidato);
    }

    @Override
    public Candidato arquivarCandidato(Candidato candidato) {
        candidato.setStatus("ARQUIVADO");
        return candidatoRepository.save(candidato);
    }

    @Override
    public Boolean excluirCandidato(Candidato candidato) {
        try {
            if(arquivoService.excluirArquivo(candidato.getCurriculoNome())) {
                candidatoRepository.delete(candidato);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
           return false;
        }
    }

    @Override
    public Page<Candidato> getCandidatos(String filtro, String campoOrdenado, String ordem, Pageable pageable) {
        if(ordem.equalsIgnoreCase("ASC")) {
            return candidatoRepository.findByAnyStringFieldContainingIgnoreCaseAscendente(filtro,campoOrdenado, pageable);
        } else {
            return candidatoRepository.findByAnyStringFieldContainingIgnoreCaseDesc(filtro, campoOrdenado, pageable);
        }
    }

}
