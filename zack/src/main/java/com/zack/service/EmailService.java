package com.zack.service;

import javax.mail.MessagingException;

import com.zack.domain.model.Usuario;

public interface EmailService {

    void enviarSenha(Usuario usuario, String senhaUsuario) throws MessagingException;

}
