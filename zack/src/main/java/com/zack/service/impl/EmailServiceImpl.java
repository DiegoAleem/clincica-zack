package com.zack.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.zack.service.EmailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailServiceImpl  implements EmailService {
    
    private final JavaMailSender mailSender;
     
    @Override
    public void enviarSenha(String recipientEmail, String senhaUsuario) {
        var message = new SimpleMailMessage();
        message.setFrom("noreplay@zack.com");
        message.setTo(recipientEmail);
        message.setSubject("Parabéns! Você passou no processo seletivo da Clínica Zack!");
        message.setText(senhaUsuario);
        mailSender.send(message);
    }

}
