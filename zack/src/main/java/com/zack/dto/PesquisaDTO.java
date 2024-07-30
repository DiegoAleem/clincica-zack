package com.zack.dto;

import java.util.ArrayList;

import com.zack.domain.model.TipoAbordagem;

public record PesquisaDTO(String isOnline, String nome, String tipoAtendimento, FormaPagamentoDTO formaPagamento, AtendimentoDTO atendimento, String valorConsulta, ArrayList<TipoAbordagem> abordagem, Integer tamanhoPagina) {
    
    public PesquisaDTO {
        if (abordagem == null) {
            abordagem = new ArrayList<>();
        }
    }
}
