package com.zack.dto;

import java.util.List;

import com.zack.domain.model.Especialidade;
import com.zack.domain.model.TipoAbordagem;
import com.zack.domain.model.Usuario;

public record PerfilDTO(
        Long id,
        String nome,
        String sobrenome,
        String crp,
        String sexo,
        Float valorConsulta,
        boolean isCartao,
        boolean isPix,
        boolean isTransferencia,
        boolean isPlano,
        String tempoConsulta1,
        String tempoConsulta2,
        boolean atendeCrianca,
        boolean atendeAdolescente,
        boolean atendeAdulto,
        boolean atendeIdoso,
        String formacaoECursos,
        String sobreMim,
        String linkAtendimentoOnline,
        String linkAtendimento,
        Usuario usuario,
        Float mediaAvaliacoes,
        List<Especialidade> especialidades,
        List<TipoAbordagem> tiposAbordagem,
        String nomeFoto,
        String breveDescricao
        
        ) {

}
