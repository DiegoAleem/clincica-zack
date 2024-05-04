package com.zack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zack.domain.model.Perfil;
import com.zack.domain.model.PerfilEspecialidade;

public interface PerfilEspecialidadeRepository extends JpaRepository<PerfilEspecialidade, Long>{

    List<PerfilEspecialidade> findAllByPerfil(Perfil perfil);

}
