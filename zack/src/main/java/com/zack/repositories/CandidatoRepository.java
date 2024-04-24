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
            "UPPER(c.status) LIKE CONCAT('%', UPPER(:filtro), '%')" +
            "ORDER BY " +
            "CASE WHEN :campoOrdenado = 'nome' THEN c.nome END ASC, " +
            "CASE WHEN :campoOrdenado = 'email' THEN c.email END ASC, " +
            "CASE WHEN :campoOrdenado = 'telefone' THEN c.telefone END ASC, " +
            "CASE WHEN :campoOrdenado = 'crp' THEN c.crp END ASC, " +
            "CASE WHEN :campoOrdenado = 'curriculoNome' THEN c.curriculoNome END ASC, " +
            "CASE WHEN :campoOrdenado = 'status' THEN c.status END ASC"
    )
    Page<Candidato> findByAnyStringFieldContainingIgnoreCaseAscendente(String filtro, String campoOrdenado, Pageable pageable);
    
    @Query("SELECT c FROM Candidato c WHERE " +
            "UPPER(c.nome) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.email) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.telefone) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "(c.crp) LIKE CONCAT('%', (:filtro), '%') OR " +
            "UPPER(c.curriculoNome) LIKE CONCAT('%', UPPER(:filtro), '%') OR " +
            "UPPER(c.status) LIKE CONCAT('%', UPPER(:filtro), '%')" +
            "ORDER BY " +
            "CASE WHEN :campoOrdenado = 'nome' THEN c.nome END DESC, " +
            "CASE WHEN :campoOrdenado = 'email' THEN c.email END DESC, " +
            "CASE WHEN :campoOrdenado = 'telefone' THEN c.telefone END DESC, " +
            "CASE WHEN :campoOrdenado = 'crp' THEN c.crp END DESC, " +
            "CASE WHEN :campoOrdenado = 'curriculoNome' THEN c.curriculoNome END DESC, " +
            "CASE WHEN :campoOrdenado = 'status' THEN c.status END DESC"
    )
    Page<Candidato> findByAnyStringFieldContainingIgnoreCaseDesc(String filtro, String campoOrdenado, Pageable pageable);
}
