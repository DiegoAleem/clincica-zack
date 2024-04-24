package com.zack.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zack.domain.model.Candidato;


public interface CandidatoRepository extends JpaRepository<Candidato, String>{
    
    Optional<Candidato> findByEmail(String email);
    Optional<Candidato> findBycrp(String crp);
}
