package com.zack.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.zack.domain.model.TipoAbordagem;
import com.zack.repositories.TipoAbordagemRepository;
import com.zack.service.TipoAbordagemService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TipoAbordagemServiceImpl implements TipoAbordagemService {
    
    private final TipoAbordagemRepository tipoAbordagemRepository;
    
    @Override
    public List<TipoAbordagem> getAll() {
        return tipoAbordagemRepository.findAll();
    }

}
