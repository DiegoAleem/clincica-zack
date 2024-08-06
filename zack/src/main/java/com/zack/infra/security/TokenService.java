package com.zack.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Role;
import com.zack.domain.model.Usuario;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario user, Perfil perfil) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            
            List<Long> roleIds = user.getRoles().stream()
                    .map(Role::getIdRole)
                    .collect(Collectors.toList());
            
            return JWT.create().withIssuer("login-auth-api")
                    .withSubject(user.getEmail())
                    .withClaim("roles",  roleIds)
                    .withClaim("userId", user.getId())
                    .withClaim("perfilId", perfil.getId())
                    .withExpiresAt(generateExpiretionDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeErrorException(null, "Erro ao autenticar");
        }
    }
    
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private Instant generateExpiretionDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
