package com.zack.service;

import java.io.IOException;
import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;

public interface ArquivoService {
    
    String salvarArquivo(String crp, MultipartFile curriculo, String tipo);
    
    Path getFilePathName(String nomeArquivo);

    boolean excluirArquivo(String nomeArquivo);

    byte[] recuperarArquivoPeloNome(String nomeArquivo) throws IOException;

}
