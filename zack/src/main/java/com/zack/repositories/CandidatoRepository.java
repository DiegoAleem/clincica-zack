package com.zack.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.zack.domain.model.Candidato;


public interface CandidatoRepository extends JpaRepository<Candidato, String>{
    
    Optional<Candidato> findByEmail(String email);
    Optional<Candidato> findBycrp(String crp);
    
    @Query("SELECT c FROM Candidato c WHERE " +
            "UPPER(c.nome) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.email) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.telefone) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "(c.crp) LIKE CONCAT('%', (:filtro), '%') OR " +
            "UPPER(c.curriculoNome) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.status) LIKE CONCAT('%', UPPER(:filtro), '%')"
    )
    Page<Candidato> findByAnyStringFieldContainingIgnoreCase(String filtro, Pageable pageable);
    
}
