package com.zack.domain.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PerfilTipoAbordagemId implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Column(name = "PERFIL_ID")
    private Long perfilId;
    
    @Column(name = "TIPO_ABORDAGEM_ID")
    private Long tipoAbordagemId;

}
