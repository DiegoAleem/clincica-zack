package com.zack.domain.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PERFIL_TIPO_ABORDAGEM")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PerfilTipoAbordagem {

    @EmbeddedId
    private PerfilTipoAbordagemId id;
    
    @ManyToOne
    @JoinColumn(name = "PERFIL_ID", insertable = false, updatable = false)
    private Perfil perfil;

    @ManyToOne
    @JoinColumn(name = "TIPO_ABORDAGEM_ID", insertable = false, updatable = false)
    private TipoAbordagem tipoAbordagem;
    
}