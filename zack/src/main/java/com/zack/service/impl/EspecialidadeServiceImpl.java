package com.zack.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.zack.domain.model.Especialidade;
import com.zack.repositories.EspecialidadeRepository;
import com.zack.service.EspecialidadeService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EspecialidadeServiceImpl implements EspecialidadeService {
    
    private final EspecialidadeRepository especialidadeRepository;
    
    @Override
    public List<Especialidade> getAll() {
        return especialidadeRepository.findAll();
    }

}
