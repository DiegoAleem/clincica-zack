package com.zack.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.zack.domain.model.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, String> {

    
    
    @Query("SELECT p FROM Perfil p " +
            "JOIN p.usuario u " +
            "WHERE " +
            "(UPPER(p.nome) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) AND " +
            "(UPPER(REPLACE(p.crp, '/', '')) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) AND " +
            "(UPPER(p.sexo) LIKE CONCAT('%', UPPER(:filtro), '%') OR :filtro IS NULL) AND " +
            "(u.ativo = true)"
    )
    Page<Perfil> findByAnyFieldContainingIgnoreCase(String filtro, Pageable pageable);

}
