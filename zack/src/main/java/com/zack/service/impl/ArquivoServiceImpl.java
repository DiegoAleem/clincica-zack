package com.zack.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
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
    public String salvarArquivo(String crp, MultipartFile curriculo, String tipo) {
        String fileName = this.getFileName(curriculo, crp, tipo);

        try {
            Path targetLocation = fileStorageLocation.resolve(fileName);
            curriculo.transferTo(targetLocation);

            ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/files/download/").path(fileName).toUriString();
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

    @Override
    public boolean excluirArquivo(String nomeArquivo) {
        try {
            Path filePath = getFilePathName(nomeArquivo);
            Files.deleteIfExists(filePath);
            return !Files.exists(filePath);
        } catch (IOException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    private String getFileName(MultipartFile arquivo, String crp, String tipo) {
        String originalFilename = arquivo.getOriginalFilename();

        String extension = FilenameUtils.getExtension(originalFilename);

        return StringUtils.cleanPath(new StringBuilder(crp.replaceAll("[^0-9]", "")).append(tipo).append(extension).toString());
    }

    @Override
    public byte[] recuperarArquivoPeloNome(String nomeArquivo) throws IOException {
        if (nomeArquivo != null && !nomeArquivo.isEmpty()) {
            Path filePath = getFilePathName(nomeArquivo);
            if (Files.exists(filePath)) {
                return Files.readAllBytes(filePath);
            } else {
                throw new FileNotFoundException("O arquivo não foi encontrado: " + nomeArquivo);
            }
        }
        return new byte[0];
    }

}
