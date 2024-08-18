package com.zack.service.impl;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Role;
import com.zack.domain.model.Usuario;
import com.zack.repositories.PerfilRepository;
import com.zack.repositories.RoleRepository;
import com.zack.repositories.UsuarioRepository;
import com.zack.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final PerfilRepository perfilRepository;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

    @Override
    public Usuario criarUsuario(Candidato candidato) {
        try {
            Usuario usuario = new Usuario();
            usuario.setEmail(candidato.getEmail());
            usuario.setNome(candidato.getNome());
            List<Role> psicologoRole = new ArrayList<>();
            psicologoRole.add(roleRepository.getReferenceById("1"));
            usuario.setRoles(psicologoRole);
            String senha = this.generatePassword(12);
            usuario.setSenha(passwordEncoder.encode(senha));
            usuario.setAtivo(true);
            // emailService.enviarSenha(usuario, senha);
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            e.getStackTrace();
            return null;
        }
    }

    private String generatePassword(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(randomIndex));
        }

        return password.toString();
    }

    @Override
    public Optional<Usuario> findById(String id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario desativarUsuario(Usuario usuario, String usuarioLogin) {
        if (alteraPerfil(usuario, usuarioLogin)) {
            usuario.setAtivo(false);
            return usuarioRepository.save(usuario);
        }
        return new Usuario();
    }

    private boolean alteraPerfil(Usuario usuario, String usuarioLogin) {
        try {
            Optional<Perfil> perfil = perfilRepository.findByUsuario(usuario);
            if (perfil.isPresent()) {
                perfil.get().setDataAlt(new Date());
                perfil.get().setUsuarioAlt(usuarioLogin);
                perfilRepository.save(perfil.get());
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Usuario ativarUsuario(Usuario usuario, String usuarioLogin) {
        if (alteraPerfil(usuario, usuarioLogin)) {
            usuario.setAtivo(true);
            return usuarioRepository.save(usuario);
        } else {
            return new Usuario();
        }
    }

}
