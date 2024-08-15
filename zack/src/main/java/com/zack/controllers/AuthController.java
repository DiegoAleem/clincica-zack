package com.zack.controllers;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.dto.LoginRequestDTO;
import com.zack.dto.RegisterRequestDTO;
import com.zack.dto.ResponseDTO;
import com.zack.dto.RespostaCandidatoDTO;
import com.zack.infra.security.TokenService;
import com.zack.repositories.CandidatoRepository;
import com.zack.repositories.UsuarioRepository;
import com.zack.service.ArquivoService;
import com.zack.service.PerfilService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final CandidatoRepository candidatoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final ArquivoService arquivoService;
    private final PerfilService perfilService;
   

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body) {

        Usuario usuario = usuarioRepository.findByEmail(body.email())
            .orElseThrow(() -> new RuntimeException("Usuário: " + body.email() + " não encontrado"));

        // Verifica se a senha fornecida corresponde à senha codificada armazenada no banco de dados
        if (passwordEncoder.matches(body.password(), usuario.getSenha()) || body.password().equals(usuario.getSenha())) {
            Perfil perfil = perfilService.getPerfilPorUsuario(usuario);
            String token = this.tokenService.generateToken(usuario, perfil);
            return ResponseEntity.ok(new ResponseDTO(usuario.getEmail(), token, usuario.getRoles().toString()));
        }

        return ResponseEntity.badRequest().build();

    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RespostaCandidatoDTO> register(
            @RequestParam("json") String json, 
            @RequestParam("curriculo") MultipartFile curriculo,
            @RequestParam("historico") MultipartFile historico) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        RegisterRequestDTO body = objectMapper.readValue(json, RegisterRequestDTO.class);
        if (this.candidatoRepository.findBycrp(body.crp()).isEmpty() && this.candidatoRepository.findByEmail(body.email()).isEmpty()) {
            Candidato novoCandidato = new Candidato();
            novoCandidato.setCrp(body.crp());
            novoCandidato.setTelefone(body.telefone());
            novoCandidato.setNome(body.nome());
            novoCandidato.setEmail(body.email());
            novoCandidato.setStatus("PARA ANÁLISE");
            novoCandidato.setCurriculoNome(arquivoService.salvarArquivo(novoCandidato.getCrp() ,curriculo, "-curriculo."));
            novoCandidato.setHistoricoNome(arquivoService.salvarArquivo(novoCandidato.getCrp() ,historico, "-historico."));
            try {
                return ResponseEntity.ok(new RespostaCandidatoDTO(this.candidatoRepository.save(novoCandidato)));
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
    


}
