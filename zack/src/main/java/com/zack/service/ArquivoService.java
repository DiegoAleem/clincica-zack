package com.zack.service;

import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;

public interface ArquivoService {
    
    String salvarArquivoCandidato(String crp, MultipartFile curriculo);
    
    Path getFilePathName(String nomeArquivo);

}
