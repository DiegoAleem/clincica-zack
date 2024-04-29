package com.zack.service;

import javax.mail.MessagingException;

public interface EmailService {

    void enviarSenha(String recipientEmail, String senhaUsuario) throws MessagingException;

}
