package com.zack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zack.domain.model.Perfil;
import com.zack.domain.model.PerfilTipoAbordagem;

public interface PerfilTipoAbordagemRepository extends JpaRepository<PerfilTipoAbordagem, Long> {

    List<PerfilTipoAbordagem> findAllByPerfil(Perfil perfil);

}
