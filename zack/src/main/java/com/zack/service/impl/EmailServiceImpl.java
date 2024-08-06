package com.zack.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Usuario;
import com.zack.service.EmailService;

@Component
public class EmailServiceImpl implements EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Value("$(spring.mail.username)")
    private String emailFrom;
    

    @Override
    public void enviarSenha(Usuario usuario, String senhaUsuario) {
        String mensagem = "Assunto: Informações de Acesso ao Sistema\r\n"
                + "\r\n"
                + "Prezado(a), "+usuario.getNome()+"\r\n"
                + "\r\n"
                + "Estamos enviando suas informações de acesso ao nosso sistema. Abaixo estão os detalhes:\r\n"
                + "\r\n"
                + "Nome de Usuário: "+usuario.getEmail()+"\r\n"
                + "Senha: "+senhaUsuario+"\r\n"
                + "Instruções para Acesso:\r\n"
                + "\r\n"
                + "Acesse o nosso sistema através do link http://localhost:4200/login.\r\n"
                + "Utilize o nome de usuário e senha fornecidos acima para fazer login.\r\n"
                + "Importante:\r\n"
                + "\r\n"
                + "Recomendamos que você altere sua senha imediatamente após o primeiro login para garantir a segurança de sua conta.\r\n"
                + "Caso tenha qualquer dificuldade para acessar ou precise de suporte adicional, entre em contato conosco através da recepção.\r\n"
                + "Atenciosamente,\r\n"
                + "\r\n"
                + "Clínica Zack\r\n";
        
        try {
           SimpleMailMessage smm = new SimpleMailMessage();
           smm.setFrom("envioszack@gmail.com");
           smm.setTo(usuario.getEmail());
           smm.setText(mensagem);
           smm.setSubject("Senha de Acesso.");
           
           javaMailSender.send(smm);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
