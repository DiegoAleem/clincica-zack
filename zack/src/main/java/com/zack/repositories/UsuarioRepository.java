package com.zack.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zack.domain.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{

    Optional<Usuario> findByEmail(String email);

}
