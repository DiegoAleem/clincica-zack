package com.zack.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.repositories.PerfilRepository;
import com.zack.service.PerfilService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PerfilServiceImpl implements PerfilService {
    
    private final PerfilRepository perfilRepository;
    
    @Override
    public Perfil criarPerfil(Candidato candidato, Usuario usuario) {
        Perfil perfil = new Perfil();
        perfil.setNome(candidato.getNome().substring(0, candidato.getNome().indexOf(" ")));
        perfil.setCrp(candidato.getCrp());
        perfil.setUsuario(usuario);
        return perfilRepository.save(perfil);
    }

    @Override
    public Page<Perfil> getPerfis(String filtro, Pageable pageable) {
        return perfilRepository.findByAnyFieldContainingIgnoreCase(filtro, pageable);
    }

}
