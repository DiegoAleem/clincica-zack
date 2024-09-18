package com.zack.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;

public interface PerfilRepository extends JpaRepository<Perfil, String> {

    @Query("SELECT p FROM Perfil p " + "JOIN p.usuario u " + "WHERE (u.ativo = true) AND (" + "(UPPER(p.nome) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) OR "
            + "(UPPER(REPLACE(p.crp, '/', '')) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) OR " + "(UPPER(p.sexo) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL)) ")
    Page<Perfil> findByAnyFieldContainingIgnoreCase(String filtro, Pageable pageable);

    @Query("SELECT p FROM Perfil p " + "JOIN p.usuario u " + "WHERE (u.ativo = true OR u.ativo = false) AND (" + "(UPPER(p.nome) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) OR "
            + "(UPPER(REPLACE(p.crp, '/', '')) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) OR " + "(UPPER(p.sexo) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL)) ")
    Page<Perfil> findAllByAnyFieldContainingIgnoreCase(String filtro, Pageable pageable);

    Optional<Perfil> findByUsuario(Usuario usuario);
    
    @Query("SELECT p FROM Perfil p JOIN p.usuario u WHERE u.ativo = true  AND p.breveDescricao IS NOT NULL ORDER BY p.nome ASC, p.mediaAvaliacoes DESC")
    List<Perfil> findTop3ByOrderByMediaAvaliacoesDesc(Pageable pageable);
    
}
