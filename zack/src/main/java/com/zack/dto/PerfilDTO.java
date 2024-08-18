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
        boolean cartao,
        boolean pix,
        boolean transferencia,
        boolean plano,
        String tempoConsulta1,
        String tempoConsulta2,
        boolean atendeCrianca,
        boolean atendeAdolescente,
        boolean atendeAdulto,
        boolean atendeIdoso,
        boolean atendeCasais,
        boolean atendeOnline,
        boolean atendePresencial,
        boolean atendePlano,
        boolean atendeParticular,
        boolean particular,
        String formacaoECursos,
        String sobreMim,
        String linkAtendimentoOnline,
        String linkAtendimento,
        Usuario usuario,
        Float mediaAvaliacoes,
        List<Especialidade> especialidades,
        List<TipoAbordagem> tiposAbordagem,
        String nomeFoto,
        String breveDescricao,
        String usuarioIns
        ) {

}
