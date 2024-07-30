package com.zack.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.Usuario;
import com.zack.dto.FotoResponseDTO;
import com.zack.dto.PerfilDTO;
import com.zack.dto.PerfilResponseDTO;
import com.zack.dto.PesquisaDTO;
import com.zack.service.ArquivoService;
import com.zack.service.PerfilService;
import com.zack.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/perfil")
@RequiredArgsConstructor
public class PerfilController {

    private final PerfilService perfilService;
    private final ArquivoService arquivoService;
    private final UsuarioService usuarioService;
    
    @GetMapping("/filtrados")
    public ResponseEntity<Page<Perfil>> getAll(@RequestParam(defaultValue = "") String filtro, @RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "10") int tamanhoPagina,
            @RequestParam(required = false, defaultValue = "nome") String campoOrdenado, @RequestParam(required = false, defaultValue = "ASC") String ordem) {
        Pageable pageable;
        if (ordem.equals("ASC")) {
            pageable = PageRequest.of(pagina - 1, tamanhoPagina, Sort.by(Sort.Direction.ASC, campoOrdenado));
        } else {
            pageable = PageRequest.of(pagina - 1, tamanhoPagina, Sort.by(Sort.Direction.DESC, campoOrdenado));
        }
        return ResponseEntity.ok(perfilService.getPerfis(filtro, pageable));
    }
    
    @GetMapping("/filtrados-melhor-avaliados")
    public ResponseEntity<List<PerfilResponseDTO>> getAllOrderRate(@RequestParam String filtro) throws  IOException {
        Pageable pageable;

        String campoOrdenado = "mediaAvaliacoes";
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true);
        PesquisaDTO pesquisa = objectMapper.readValue(filtro, PesquisaDTO.class);
        pageable = PageRequest.of(0, pesquisa.tamanhoPagina(), Sort.by(Sort.Direction.ASC, campoOrdenado));
        Page<Perfil> perfis = perfilService.getPerfisFiltroMelhorAvaliados(pesquisa, pageable);
        List<PerfilResponseDTO> retorno = new ArrayList<>();
        for(Perfil perfil : perfis.getContent()) {
            FotoResponseDTO fotoResponseDTO = getFoto(perfil.getNomeFoto());
            retorno.add(new PerfilResponseDTO(perfil, fotoResponseDTO));
        }
        return ResponseEntity.ok(retorno);
    }

    @PutMapping("/editar")
    public ResponseEntity<Perfil> editarPerfil(@RequestParam("json") String json, @RequestParam("foto") MultipartFile foto) throws  JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        PerfilDTO body = objectMapper.readValue(json, PerfilDTO.class);
        Perfil perfil = perfilService.salvarPerfil(body, arquivoService.salvarArquivo(body.crp(), foto, "-foto."));

        return ResponseEntity.ok(perfil);
    }

    
    @GetMapping("/top-rated")
    public ResponseEntity<List<PerfilResponseDTO>> getTopRatedProfiles() throws IOException {
        List<PerfilResponseDTO> retorno = new ArrayList<>();
        List<Perfil> perfis = perfilService.getTop3ProfilesWithHighestAverageRating();
        for(Perfil perfil : perfis) {
            FotoResponseDTO fotoResponseDTO = getFoto(perfil.getNomeFoto());
            retorno.add(new PerfilResponseDTO(perfil, fotoResponseDTO));
        }
        return ResponseEntity.ok(retorno);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<PerfilResponseDTO> getPerfil(@PathVariable String id) throws IOException {
        Perfil perfil = perfilService.getPerfil(id);
        
        FotoResponseDTO fotoResponse = getFoto(perfil.getNomeFoto());
        PerfilResponseDTO perfilDTO = new PerfilResponseDTO(perfil, fotoResponse);
        
        return ResponseEntity.ok(perfilDTO);
    }
    
    @GetMapping("buscarPorUsuario/{id}")
    public ResponseEntity<Long> getPerfilPorUsuario(@PathVariable String id) {
        Optional<Usuario> optional = usuarioService.findById(id);
        if(optional.isPresent()) {
            Usuario usuario = optional.get();
            Perfil perfil = perfilService.getPerfilPorUsuario(usuario);
            return ResponseEntity.ok(perfil.getId());
        }
        return ResponseEntity.ok(0L);
    }
    
    private FotoResponseDTO getFoto(String nomeFoto) throws IOException {
        byte[] foto = arquivoService.recuperarArquivoPeloNome(nomeFoto);
        return new FotoResponseDTO(Base64.getEncoder().encodeToString(foto), FilenameUtils.getExtension(nomeFoto), nomeFoto);
    }
}
