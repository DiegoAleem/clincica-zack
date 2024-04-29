package com.zack.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.dto.CriacaoPerfilDTO;
import com.zack.repositories.CandidatoRepository;
import com.zack.service.ArquivoService;
import com.zack.service.CandidatoService;
import com.zack.service.PerfilService;
import com.zack.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CandidatoServiceImpl implements CandidatoService {
    
    private final CandidatoRepository candidatoRepository;
    private final ArquivoService arquivoService;
    private final UsuarioService usuarioService;
    private final PerfilService perfilService; 
    
    @Override
    public List<Candidato> findAll() {
        return candidatoRepository.findAll();
    }

    @Override
    public Optional<Candidato> findById(String id) {
        return candidatoRepository.findById(id);
    }

    @Override
    public CriacaoPerfilDTO aprovarCandidato(Candidato candidato) {
        Usuario usuario = usuarioService.criarUsuario(candidato);
        Perfil perfil = perfilService.criarPerfil(candidato, usuario);
        candidato.setStatus("APROVADO");
        candidato = candidatoRepository.save(candidato);
        return new CriacaoPerfilDTO(perfil, usuario, candidato);
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
    public Page<Candidato> getCandidatos(String filtro, Pageable pageable) {
            return candidatoRepository.findByAnyStringFieldContainingIgnoreCase(filtro, pageable);
    }

}
