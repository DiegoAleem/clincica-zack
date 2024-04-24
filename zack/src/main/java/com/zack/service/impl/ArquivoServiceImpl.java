package com.zack.service.impl;

import java.io.IOException;
import java.nio.file.Path;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.zack.service.ArquivoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ArquivoServiceImpl implements ArquivoService {
    
    private final Path fileStorageLocation;
    
    @Override
    public String salvarArquivoCandidato(String crp, MultipartFile curriculo) {
        String originalFilename = curriculo.getOriginalFilename();
        
        String extension = FilenameUtils.getExtension(originalFilename);
        
        String fileName = StringUtils.cleanPath(new StringBuilder(crp.replaceAll("[^0-9]", "")).append("-curriculo.").append(extension).toString());

        try {
          Path targetLocation = fileStorageLocation.resolve(fileName);
          curriculo.transferTo(targetLocation);

           ServletUriComponentsBuilder.fromCurrentContextPath()
              .path("/api/files/download/")
              .path(fileName)
              .toUriString();
           return fileName;
        } catch (IOException ex) {
          ex.printStackTrace();
          return "";
        }
        
    }

    @Override
    public Path getFilePathName(String nomeArquivo) {
        return fileStorageLocation.resolve(nomeArquivo).normalize();
    }

}
